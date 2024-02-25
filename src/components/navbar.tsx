import { PackageSearch, PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useMediaQuery } from "usehooks-ts";
import { ModeToggle } from "./mode-toggle";
import { SearchItemCommand } from "./command";
import { Button } from "./ui/button";
import { ItemFormDialog } from "./item-form-dialog";

export const Navbar = () => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <>
      <nav
        className={cn(
          "container flex py-1 items-center sticky z-50 dark:bg-zinc-950 bg-white",
          !isDesktop && "bottom-0 ",
          isDesktop && "top-0",
        )}
      >
        <Link className="flex items-center space-x-4" to="/">
          <PackageSearch className="h-6 w-6" />
          {isDesktop && (
            <p
              className={cn(
                "scroll-m-20 text-2xl font-bold tracking-tight lg:text-2xl",
              )}
            >
              UTAK CRUD MENU APP
            </p>
          )}
        </Link>

        <div className="inline-flex ml-auto items-center space-x-2">
          <ItemFormDialog />
          <SearchItemCommand />
          <ModeToggle />
        </div>
      </nav>
    </>
  );
};
