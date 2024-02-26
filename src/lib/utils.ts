import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const imagePreviewSrc = (filePaths: Array<string>): string =>
  filePaths && filePaths.length > 0 && filePaths[0] !== "default.png"
    ? filePaths[0]
    : "/default.jpg";

export const capitalizeFirstLetter = (str: string): string => {
  if (str.length === 0) return str;

  return str.charAt(0).toUpperCase() + str.slice(1);
};
