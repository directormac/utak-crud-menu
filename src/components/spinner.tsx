import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export const Spinner = ({ className }: { className?: string }) => {
  return (
    <>
      <div className={cn("flex justify-center items-center", className)}>
        <Loader2 className="animate-spin w-32 h-32" />
      </div>
    </>
  );
};
