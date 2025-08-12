# Pipecat Sandbox

A simple sandbox for testing Pipecat AI voice bots using the [@pipecat-ai/voice-ui-kit](https://github.com/pipecat-ai/voice-ui-kit).

## Live

I've published the Pipecat Sandbox from this repo as a Cloudflare worker that accepts a bot name and a public api key: `https://pipecat-sandbox.5sides.workers.dev?bot=BOT_NAME&key=PIPECAT_PUBLIC_API_KEY`. Can't promise how long I'll keep it online but works for now. 👍

## Usage

To use the application with a specific bot, add the bot name and optionally the API key as URL parameters:

```http
http://localhost:5173/?bot=couples&key=your_pipecat_api_key_here
```

The bot name will be used to construct the full Pipecat API URL: `https://api.pipecat.daily.co/v1/public/{bot-name}/start`

## Development

```bash
pnpm install
pnpm dev
```

## Related

- [Discord Thread](https://discord.com/channels/1239284677165056021/1260602628803395645/1403775704247697539)
- [Pipecat Voice UI Kit](https://github.com/pipecat-ai/voice-ui-kit)
- [Pipecat Documentation](https://pipecat.ai/)
