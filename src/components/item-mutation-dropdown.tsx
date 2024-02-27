import { FC } from "react";
import { ItemDetailsLink } from "./item-details-link";
import { ItemFormDialog } from "./item-form-dialog";
import { ItemDeleteDialog } from "./item-delete-dialog";
import { useMediaQuery } from "usehooks-ts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Menu } from "lucide-react";

type Props = {
  withDetials?: boolean;
  noDropdown?: boolean;
  id: string;
  name: string;
};

export const ItemMutationActions: FC<Props> = ({
  withDetials = false,
  noDropdown = false,
  id,
  name,
}) => {
  const largeScreen = useMediaQuery("(min-width: 560px)");

  const actions = (
    <div className="flex gap-x-1">
      {withDetials && <ItemDetailsLink id={id} />}
      <ItemFormDialog update id={id} />
      <ItemDeleteDialog id={id} name={name} />
    </div>
  );

  if (noDropdown) return actions;

  return (
    <>
      {largeScreen ? (
        <>{actions}</>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Menu className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>{actions}</DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
};
