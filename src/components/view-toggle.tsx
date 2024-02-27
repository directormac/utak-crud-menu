import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Eye, LayoutGrid, Table } from "lucide-react";
import { FC } from "react";

type Props = {
  pageView: "grid" | "table";
  setPageView: React.Dispatch<React.SetStateAction<"grid" | "table">>;
};

export const ViewToggle: FC<Props> = ({ pageView, setPageView }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Eye className="h-4 w-4" />
          <span className="sr-only">View Toggle</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit text-xs md:text-md" align="end">
        <DropdownMenuItem
          className={cn(pageView === "grid" && "bg-secondary")}
          onClick={() => setPageView("grid")}
        >
          <LayoutGrid />
          Grid View
        </DropdownMenuItem>
        <DropdownMenuItem
          className={cn(pageView === "table" && "bg-secondary")}
          onClick={() => setPageView("table")}
        >
          <Table />
          Table View
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
