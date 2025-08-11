import {
  ConsoleTemplate,
  FullScreenContainer,
  ThemeProvider,
} from "@pipecat-ai/voice-ui-kit";

// Import recommended fonts
import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";

// Import voice-ui-kit styles
import "@pipecat-ai/voice-ui-kit/styles.css";

// Make this component client-side only
export const clientOnly = true;

interface SandboxProps {
  connectionUrl: string;
}

export default function Sandbox({ connectionUrl }: SandboxProps) {
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
