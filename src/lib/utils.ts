import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function copyText(text: string) {
  navigator.clipboard.writeText(text);
}

export function downloadElementAsImage(elementId: string) {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Element with ID "${elementId}" not found`);
  }

  // dynamic library call boiii !! (saves 14kb on first load)
  import("html-to-image")
    .then((funcs) =>
      funcs
        .toBlob(element)
        .then((dataBlob) => {
          if (!dataBlob) return;
          const url = URL.createObjectURL(dataBlob);
          const link = document.createElement("a");
          link.href = url;
          link.download = "ishmam_rahman.png";

          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          URL.revokeObjectURL(url);
        })
        .catch((_err) => {
          // console.error("oops, something went wrong!", err);
        }),
    )
    .catch((_err) => {
      // console.error("oops, something went wrong!", err);
    });
}
