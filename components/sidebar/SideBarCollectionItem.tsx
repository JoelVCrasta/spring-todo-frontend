"use client";

import { colorMap } from "@/utils/colorMap";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Minus } from "lucide-react";
import { memo } from "react";
import IconButton from "../IconButton";

interface SideBarCollectionItemProps {
  id: string;
  title: string;
  collectionColor?: string;
  todoCount?: number;
}

const SideBarCollectionItem = ({
  id,
  title,
  collectionColor = "gray",
  todoCount = 0,
}: SideBarCollectionItemProps) => {
  const colorClass = colorMap[collectionColor];

  const searchParams = useSearchParams();
  const currentView =
    searchParams.get("view") === "collection" && searchParams.get("id") === id;

  return (
    <Link
      href={`?view=collection&id=${id}`}
      className={`w-full flex items-center hover:bg-accent-secondary rounded-md transition-colors duration-200 ${currentView ? "bg-accent-secondary" : ""}`}
    >
      <div className="w-full flex items-center gap-2 px-2 py-1.5 whitespace-nowrap text-ellipsis">
        <div className={`${colorClass} w-3 h-3 rounded-sm shrink-0`} />
        <span className="text-foreground text-sm font-medium truncate">
          {title}
        </span>
      </div>

      <div className="flex items-center gap-0.5 mr-2">
        <div className="w-4 h-4 bg-accent-secondary rounded-sm flex items-center justify-center ml-auto">
          <span className="text-neutral-400 text-xs">{todoCount}</span>
        </div>
      </div>
    </Link>
  );
};

export default memo(SideBarCollectionItem);
