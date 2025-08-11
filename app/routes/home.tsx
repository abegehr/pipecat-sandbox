import {
  ConsoleTemplate,
  FullScreenContainer,
  ThemeProvider,
} from "@pipecat-ai/voice-ui-kit";
import { useSearchParams } from "react-router";

// Import recommended fonts
import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";

// Import voice-ui-kit styles
import "@pipecat-ai/voice-ui-kit/styles.css";

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
    <ThemeProvider>
      <FullScreenContainer>
        <ConsoleTemplate
          transportType="smallwebrtc"
          connectParams={{
            connectionUrl,
          }}
          noUserVideo={true}
        />
      </FullScreenContainer>
    </ThemeProvider>
  );
}
