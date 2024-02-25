import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { SearchIcon } from "lucide-react";
import { useMediaQuery } from "usehooks-ts";
import { cn } from "@/lib/utils";

export const SearchItemCommand = () => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const [open, setOpen] = useState(false);
  // query here from useQuery filtered items
  //
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // filter items here
  // useEffect(() => {}, []);

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        <SearchIcon className={cn("h-4", isDesktop && "mr-2")} />
        {isDesktop && (
          <p className="text-md text-muted-foreground">
            or Press{" "}
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-md">⌘</span>K
            </kbd>
          </p>
        )}
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a name or category of an item" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Categories"></CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Items"></CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};
