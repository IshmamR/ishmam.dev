import { DownloadIcon } from "lucide-react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../ui/context-menu";

export function HeroContextMenu({ children }: { children: React.ReactNode }) {
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>

      <ContextMenuContent className="w-auto">
        <ContextMenuItem
          onClick={() => {
            import("../../lib/utils").then((utils) => {
              utils.downloadElementAsImage("blinking_grid");
            });
          }}
        >
          <DownloadIcon />
          Download as image
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
