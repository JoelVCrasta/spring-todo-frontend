"use client";

import React from "react";

interface SideBarContentItemProps {
  title: string;
  icon: React.ReactNode;
}

const SideBarItem = ({ title, icon }: SideBarContentItemProps) => {
  return (
    <button className="flex items-center gap-2 hover:bg-accent-secondary p-2 rounded-md transition-colors duration-200 whitespace-nowrap text-ellipsis">
      <div className="text-gray-400">{icon}</div>
      <p className="text-gray-200 text-sm font-medium">{title}</p>
    </button>
  );
};

export default SideBarItem;
