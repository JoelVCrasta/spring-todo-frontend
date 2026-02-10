// ...existing code..."use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { memo } from "react";

interface SideBarContentItemProps {
  title: string;
  icon: React.ReactNode;
  href: string;
}

const SideBarItem = ({ title, icon, href }: SideBarContentItemProps) => {
  const searchParams = useSearchParams();
  const currentView = searchParams.get("view") === href.split("=")[1];

  return (
    <Link href={href} className="w-full">
      <div
        className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-accent-secondary transition-colors duration-200 whitespace-nowrap overflow-hidden text-ellipsis ${
          currentView ? "bg-accent-secondary" : ""
        }`}
      >
        <span className="text-gray-400 shrink-0">{icon}</span>
        <span className="text-foreground text-sm font-medium truncate">
          {title}
        </span>
      </div>
    </Link>
  );
};

export default memo(SideBarItem);
