import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useClipboard } from "@/mantine-hooks/use-clipboard/use-clipboard";
import { IconCheck, IconCopy } from '@tabler/icons-react';

export interface CopyButtonProps {
  /** Children callback, provides current status and copy function as an argument */
  children: (payload: { copied: boolean; copy: () => void }) => React.ReactNode;

  /** Value that will be copied to the clipboard when the button is clicked */
  value: string;

  /** Copied status timeout in ms, `1000` by default */
  timeout?: number;
}

const defaultProps: Partial<CopyButtonProps> = {
  timeout: 1000,
};

export function CopyButton(props: CopyButtonProps) {
  // const { children, timeout, value, ...others } = useProps('CopyButton', defaultProps, props);
  const { children, timeout, value, ...others } = { ...defaultProps, ...props };
  const clipboard = useClipboard({ timeout });
  const copy = () => clipboard.copy(value);
  return <>{children({ copy, copied: clipboard.copied, ...others })}</>;
}

CopyButton.displayName = 'CopyButton';




export function DemoCopyButton() {
  return (
    <CopyButton value="https://mantine.dev" timeout={2000}>
      {({ copied, copy }) => (
        <TooltipProvider  >
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={copy}
                className={copied ? 'text-teal-500 hover:text-teal-500 hover:bg-green-100/60' : 'text-gray-500'}
              >
                {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
              </Button>
            </TooltipTrigger>

            <TooltipContent side="right">
              {copied ? 'Copied' : 'Copy'}
            </TooltipContent>

          </Tooltip>
        </TooltipProvider>
      )}
    </CopyButton>
  );
}