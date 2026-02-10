"use client";

import { colorMap } from "@/utils/colorMap";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { memo } from "react";

interface SideBarCollectionItemProps {
  id: string;
  title: string;
  collectionColor?: string;
}

const SideBarCollectionItem = ({
  id,
  title,
  collectionColor = "gray",
}: SideBarCollectionItemProps) => {
  const colorClass = colorMap[collectionColor];

  const searchParams = useSearchParams();
  const currentView =
    searchParams.get("view") === "collection" && searchParams.get("id") === id;

  return (
    <Link href={`?view=collection&id=${id}`} className="w-full">
      <div
        className={`w-full flex items-center gap-2 hover:bg-accent-secondary px-2 py-1.5 rounded-md transition-colors duration-200 whitespace-nowrap text-ellipsis ${
          currentView ? "bg-accent-secondary" : ""
        }`}
      >
        <div className={`${colorClass} w-3 h-3 rounded-sm shrink-0`} />
        <span className="text-foreground text-sm font-medium truncate">
          {title}
        </span>
      </div>
    </Link>
  );
};

export default memo(SideBarCollectionItem);
