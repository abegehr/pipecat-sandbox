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
  endpoint: string;
}

export default function Sandbox({ endpoint }: SandboxProps) {
  return (
    <ThemeProvider>
      <FullScreenContainer>
        <ConsoleTemplate
          title="Pipecat Sandbox"
          connectParams={{ endpoint }}
          noUserVideo={true}
        />
      </FullScreenContainer>
    </ThemeProvider>
  );
}
