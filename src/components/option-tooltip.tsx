import { Option } from "@/lib/types";
import { FC } from "react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

type Props = {
  option: Option;
};

export const OptionTooltip: FC<Props> = ({ option }) => {
  const { name, cost, stock } = option;
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">{name.toUpperCase()}</Button>
          </TooltipTrigger>
          <TooltipContent>
            <div className="text-center text-md">
              <p>Stock: {stock}</p>
              <p>Cost: {cost}</p>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
};
