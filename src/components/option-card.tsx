import { Option } from "@/lib/types";
import { FC } from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

type Props = {
  option: Option;
};

export const OptionCard: FC<Props> = ({ option }) => {
  const { name, cost, stock } = option;
  return (
    <>
      <HoverCard>
        <HoverCardTrigger asChild>
          <p>{name}</p>
        </HoverCardTrigger>
        <HoverCardContent className="w-fit">
          <div className="text-center">
            <p>Stock: {stock}</p>
            <p>Cost: {cost}</p>
          </div>
        </HoverCardContent>
      </HoverCard>
    </>
  );
};
