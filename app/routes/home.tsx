import { useSearchParams } from "react-router";
import Sandbox from "../components/Sandbox";

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

  return <Sandbox connectionUrl={connectionUrl} />;
}
