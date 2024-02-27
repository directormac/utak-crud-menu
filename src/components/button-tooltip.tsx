import { FC } from "react";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipProvider } from "./ui/tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";

type Props = {
  children?: React.ReactNode;
  asChild?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  disabled?: boolean;
  tip?: string;
  variant?: "default" | "outline" | "ghost" | "link" | "destructive";
};

export const ButtonToolTip: FC<Props> = ({
  children,
  asChild,
  onClick,
  className,
  tip,
  variant = "default",
}) => {
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              asChild={asChild}
              variant={variant}
              className={cn(className)}
              onClick={onClick}
            >
              {children}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{tip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
};
