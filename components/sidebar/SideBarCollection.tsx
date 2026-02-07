"use client";

import { colorMap } from "@/utils/colorMap";

interface SideBarCollectionItemProps {
  title: string;
  collectionColor?: string;
}

const SideBarCollection = ({
  title,
  collectionColor = "gray",
}: SideBarCollectionItemProps) => {
  const colorClass = colorMap[collectionColor];

  return (
    <button className="flex items-center gap-2 hover:bg-accent-secondary p-2 rounded-md transition-colors duration-200 whitespace-nowrap text-ellipsis">
      <div className={`${colorClass} w-2.5 h-2.5 rounded-full`} />
      <p className="text-gray-200 text-sm font-medium">{title}</p>
    </button>
  );
};

export default SideBarCollection;
