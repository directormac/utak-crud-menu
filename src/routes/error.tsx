import { ThemeProvider } from "@/components/theme-provider";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export const ErrorPage = () => {
  const error = useRouteError();

  let message: string;

  if (isRouteErrorResponse(error)) {
    message = error.statusText;
  } else if (error instanceof Error) {
    message = error.message;
  } else {
    message = "Something went wrong";
  }

  return (
    <ThemeProvider>
      <div className="flex flex-col gap-10 justify-center items-center h-screen">
        <h1 className="text-red-500 text-7xl">Oops!</h1>
        <p>
          <i>{message}</i>
        </p>
      </div>
    </ThemeProvider>
  );
};
