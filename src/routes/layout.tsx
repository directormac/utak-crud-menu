import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/navbar";
import { cn } from "@/lib/utils";

export const Layout = () => {
  // const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <>
      <Navbar />
      <div className={cn("container pt-14")}>
        <Outlet />
      </div>
    </>
  );
};
