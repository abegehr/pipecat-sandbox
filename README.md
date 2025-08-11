# Pipecat Sandbox

A simple sandbox for testing Pipecat AI voice bots using the [@pipecat-ai/voice-ui-kit](https://github.com/pipecat-ai/voice-ui-kit).

## Usage

To use the application with a specific bot, add the bot name and optionally the API key as URL parameters:

```
http://localhost:5173/?bot=couples&key=your_pipecat_api_key_here
```

Or without an API key (if the bot doesn't require authentication):

```
http://localhost:5173/?bot=couples
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
