import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { customAlphabet } from "nanoid";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const imagePreviewSrc = (filePaths: Array<string>): string =>
  filePaths && filePaths.length > 0 && filePaths[0] !== "default.png"
    ? filePaths[0]
    : "/default.jpg";
