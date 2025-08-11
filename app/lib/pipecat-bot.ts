import { PipecatClient } from "@pipecat-ai/client-js";
import { DailyTransport } from "@pipecat-ai/daily-transport";

// Example bot configuration
export interface BotConfig {
  roomUrl: string;
  token: string;
  botName?: string;
}

// Create a Pipecat client with Daily transport
export async function createPipecatClient(
  config: BotConfig,
): Promise<PipecatClient> {
  const transport = new DailyTransport({
    roomUrl: config.roomUrl,
    token: config.token,
  });

  const client = new PipecatClient({
    transport,
  });

  return client;
}

// Example bot setup - replace with your actual bot configuration
export const EXAMPLE_BOT_CONFIG: BotConfig = {
  roomUrl: "https://your-daily-room-url.daily.co/your-room",
  token: "your-daily-token",
  botName: "Debug Bot",
};

// Helper function to get bot config from environment variables
export function getBotConfigFromEnv(): BotConfig | null {
  const roomUrl = import.meta.env.VITE_DAILY_ROOM_URL;
  const token = import.meta.env.VITE_DAILY_TOKEN;

  if (!roomUrl || !token) {
    console.warn("Daily room URL and token not found in environment variables");
    return null;
  }

  return {
    roomUrl,
    token,
    botName: import.meta.env.VITE_BOT_NAME || "Debug Bot",
  };
}
