import type { Route } from "./+types/debug";
import { ConsoleTemplate, ThemeProvider } from "@pipecat-ai/voice-ui-kit";
import { createPipecatClient, getBotConfigFromEnv, EXAMPLE_BOT_CONFIG } from "../lib/pipecat-bot";

// Import recommended fonts
import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";

// Import voice-ui-kit styles
import "@pipecat-ai/voice-ui-kit/styles.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Pipecat Debug Console" },
    { name: "description", content: "Debug console for Pipecat AI applications" },
  ];
}

export default function DebugConsole() {
  return (
    <ThemeProvider>
      <div className="w-full h-dvh bg-background">
        <ConsoleTemplate
          onConnect={async () => {
            console.log("Connecting to Pipecat bot...");
            
            // Try to get config from environment variables first
            let config = getBotConfigFromEnv();
            
            // Fall back to example config if no env vars
            if (!config) {
              console.warn("Using example config. Set VITE_DAILY_ROOM_URL and VITE_DAILY_TOKEN for production use.");
              config = EXAMPLE_BOT_CONFIG;
            }
            
            try {
              const client = await createPipecatClient(config);
              console.log("Pipecat client created successfully");
              return client;
            } catch (error) {
              console.error("Failed to create Pipecat client:", error);
              throw error;
            }
          }}
        />
      </div>
    </ThemeProvider>
  );
}
