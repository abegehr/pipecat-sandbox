import { lazy, Suspense } from "react";
import { useSearchParams } from "react-router";

// Dynamically import Sandbox to ensure client-side only rendering
const Sandbox = lazy(() => import("../components/Sandbox"));

// Make this route client-side only
export const clientOnly = true;

export function meta() {
  return [
    { title: "Pipecat Sandbox" },
    {
      name: "description",
      content: "Sandbox for Pipecat AI applications",
    },
  ];
}

export default function Home() {
  const [searchParams] = useSearchParams();
  const bot = searchParams.get("bot");
  const key = searchParams.get("key");

  // Check if required parameters are missing
  if (!bot || !key) {
    return (
      <div
        style={{
          padding: "2rem",
          textAlign: "center",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <h1 style={{ color: "#dc2626", marginBottom: "1rem" }}>
          Missing Required Parameters
        </h1>
        <p style={{ marginBottom: "1rem" }}>
          This sandbox requires both <code>bot</code> and <code>key</code>{" "}
          parameters.
        </p>
        <p style={{ color: "#6b7280" }}>
          Please add them to the URL:{" "}
          <code>?bot=YOUR_BOT_NAME&key=YOUR_API_KEY</code>
        </p>
      </div>
    );
  }

  // Build the connection URL with both bot name and API key
  const connectionUrl = `/api/offer?${new URLSearchParams({
    ...(bot && { bot }),
    ...(key && { key }),
  }).toString()}`;

  return (
    <Suspense fallback={<div>Loading sandbox...</div>}>
      <Sandbox connectionUrl={connectionUrl} />
    </Suspense>
  );
}
