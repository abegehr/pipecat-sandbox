import { ConsoleTemplate, ThemeProvider } from "@pipecat-ai/voice-ui-kit";

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

// Example bot configuration
export interface BotConfig {
  roomUrl: string;
  token: string;
  botName?: string;
}

export default function Home() {
  // TODO: get from query params
  const config: BotConfig = {
    roomUrl: "https://your-daily-room-url.daily.co/your-room",
    token: "your-daily-token",
    botName: "Debug Bot",
  };

  return (
    <ThemeProvider>
      <div className="w-full h-dvh bg-background">
        <ConsoleTemplate connectParams={config} />
      </div>
    </ThemeProvider>
  );
}
