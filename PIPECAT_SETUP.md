# Pipecat Debug Console Setup

This project now includes a Pipecat debug console that allows you to test and debug your voice AI applications.

## Quick Start

1. **Install dependencies** (already done):
   ```bash
   npm install @pipecat-ai/voice-ui-kit @pipecat-ai/client-js @pipecat-ai/client-react @pipecat-ai/daily-transport
   ```

2. **Set up environment variables**:
   Create a `.env` file in the root directory with the following variables:
   ```env
   VITE_DAILY_ROOM_URL=https://your-daily-room-url.daily.co/your-room
   VITE_DAILY_TOKEN=your-daily-token
   VITE_BOT_NAME=Debug Bot
   ```

3. **Get Daily.co credentials**:
   - Sign up at [Daily.co](https://daily.co)
   - Create a new room or use an existing one
   - Get the room URL and token from your Daily.co dashboard

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **Access the debug console**:
   - Go to `http://localhost:5173/debug`
   - Or click the "Pipecat Debug Console" link on the home page

## Features

The debug console includes:
- **Voice visualization** - Real-time audio waveform display
- **Message history** - Complete conversation log
- **Connection status** - Real-time connection monitoring
- **Error handling** - Detailed error messages and debugging info
- **Responsive design** - Works on desktop, tablet, and mobile

## Configuration

### Environment Variables

- `VITE_DAILY_ROOM_URL`: Your Daily.co room URL
- `VITE_DAILY_TOKEN`: Your Daily.co authentication token
- `VITE_BOT_NAME`: Optional name for your bot (defaults to "Debug Bot")

### Custom Bot Configuration

You can modify the bot configuration in `app/lib/pipecat-bot.ts`:

```typescript
export const EXAMPLE_BOT_CONFIG: BotConfig = {
  roomUrl: "your-actual-room-url",
  token: "your-actual-token",
  botName: "Your Bot Name",
};
```

## Troubleshooting

1. **Connection issues**: Make sure your Daily.co credentials are correct
2. **Audio not working**: Check browser permissions for microphone access
3. **Build errors**: Ensure all dependencies are installed correctly

## Next Steps

- Integrate with your actual Pipecat bot
- Add custom voice processing logic
- Implement specific AI agent behaviors
- Add more transport options (WebRTC, etc.)

## Resources

- [Pipecat Voice UI Kit Documentation](https://github.com/pipecat-ai/voice-ui-kit)
- [Pipecat Client Documentation](https://github.com/pipecat-ai/pipecat)
- [Daily.co Documentation](https://docs.daily.co/)
