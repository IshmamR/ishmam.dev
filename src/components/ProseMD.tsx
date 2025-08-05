import type React from "react";
import MarkdownAsync from "react-markdown";
import rehypeExternalLinks from "rehype-external-links";
import remarkGfm from "remark-gfm";
import { cn } from "../lib/utils";

export function ProseMd({
  className,
  ...props
}: React.ComponentProps<typeof MarkdownAsync> & { className?: string }) {
  return (
    <div
      className={cn(
        "prose prose-sm text-foreground prose-slate dark:prose-invert max-w-none font-mono",
        "prose-headings:font-heading prose-headings:font-semibold prose-headings:text-balance",
        "prose-h2:border-b prose-h2:pb-2",
        "prose-lead:text-base",
        "prose-a:font-semibold prose-a:break-words prose-a:text-foreground prose-a:underline prose-a:underline-offset-4",
        "prose-code:rounded-md prose-code:border prose-code:bg-muted/50 prose-code:px-[0.3rem] prose-code:py-[0.2rem] prose-code:text-sm prose-code:font-normal prose-code:before:content-none prose-code:after:content-none",
        "prose-blockquote:text-foreground! prose-strong:text-foreground prose-em:text-foreground",
        "prose-hr:border-edge",
        "text-justify text-base",
        className,
      )}
    >
      <MarkdownAsync
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          [
            rehypeExternalLinks,
            { target: "_blank", rel: "nofollow noopener noreferrer" },
          ],
        ]}
        {...props}
      />
    </div>
  );
}
