import { type ClassValue, clsx } from "clsx";
import { toBlob } from "html-to-image";
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

  toBlob(element)
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
    .catch((err) => {
      console.error("oops, something went wrong!", err);
    });
}
