import type { Route } from "./+types/offer";

export async function action({ request }: Route.ActionArgs) {
  // Get bot name and API key from search parameters
  const url = new URL(request.url);
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
