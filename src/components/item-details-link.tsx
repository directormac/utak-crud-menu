import { FC } from "react";
import { ButtonToolTip } from "./button-tooltip";
import { cn } from "@/lib/utils";
import { ReceiptText } from "lucide-react";
import { Link } from "react-router-dom";

type Props = {
  id: string;
};

export const ItemDetailsLink: FC<Props> = ({ id }) => {
  return (
    <ButtonToolTip tip="Item Details">
      <Link to={`/items/${id}`}>
        <span className={cn("sr-only md:not-sr-only", "mr-2")}>Details</span>
        <ReceiptText className="inline-flex w-4" />
      </Link>
    </ButtonToolTip>
  );
};
