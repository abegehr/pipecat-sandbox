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
