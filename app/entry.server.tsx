import { isbot } from "isbot";
import { renderToReadableStream } from "react-dom/server";
import type { AppLoadContext, EntryContext } from "react-router";
import { ServerRouter } from "react-router";

// Handle Pipecat API route
async function handlePipecatApi(request: Request): Promise<Response | null> {
  const url = new URL(request.url);

  if (url.pathname === "/api/offer" && request.method === "POST") {
    const botName = url.searchParams.get("bot");
    const key = url.searchParams.get("key");

    if (!botName) {
      return new Response(
        JSON.stringify({
          error: "Bot name is required. Use ?bot=your-bot-name in the URL",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    // Construct the full bot start URL
    const botStartUrl = `https://api.pipecat.daily.co/v1/public/${botName}/start`;

    try {
      // Prepare headers
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };

      // Add Authorization header if API key is provided
      if (key) {
        headers.Authorization = `Bearer ${key}`;
      }

      const response = await fetch(botStartUrl, {
        method: "POST",
        mode: "cors",
        headers,
        body: JSON.stringify({
          createDailyRoom: true,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to connect to Pipecat: ${response.statusText}`);
      }

      const data = (await response.json()) as any;
      if (data.error) {
        throw new Error(data.error);
      }

      return new Response(
        JSON.stringify({
          room_url: data.dailyRoom,
          token: data.dailyToken,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      );
    } catch (error) {
      return new Response(
        JSON.stringify({
          error: `Failed to process connection request: ${error}`,
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
  }

  return null;
}

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: EntryContext,
  _loadContext: AppLoadContext,
) {
  // Handle API routes first
  const apiResponse = await handlePipecatApi(request);
  if (apiResponse) {
    return apiResponse;
  }

  let status = responseStatusCode;
  let shellRendered = false;
  const userAgent = request.headers.get("user-agent");

  const body = await renderToReadableStream(
    <ServerRouter context={routerContext} url={request.url} />,
    {
      onError(error: unknown) {
        status = 500;
        // Log streaming rendering errors from inside the shell.  Don't log
        // errors encountered during initial shell rendering since they'll
        // reject and get logged in handleDocumentRequest.
        if (shellRendered) {
          console.error(error);
        }
      },
    },
  );
  shellRendered = true;

  // Ensure requests from bots and SPA Mode renders wait for all content to load before responding
  // https://react.dev/reference/react-dom/server/renderToPipeableStream#waiting-for-all-content-to-load-for-crawlers-and-static-generation
  if ((userAgent && isbot(userAgent)) || routerContext.isSpaMode) {
    await body.allReady;
  }

  responseHeaders.set("Content-Type", "text/html");
  return new Response(body, {
    headers: responseHeaders,
    status,
  });
}
