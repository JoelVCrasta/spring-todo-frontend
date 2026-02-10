"use client";

import {
  BookOpen,
  Check,
  ChevronsRight,
  CornerDownLeft,
  ListTodo,
  Plus,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import IconButton from "../IconButton";
import Circle from "@uiw/react-color-circle";
import { colorHexMap, colorMap } from "@/utils/colorMap";
import SideBarItem from "./SideBarItem";
import SideBarCollectionItem from "./SideBarCollectionItem";
import useCollectionStore from "@/app/hooks/useCollectionStore";

const DEFAULT_HEX = "#9ca3af"; // default to gray

const SideBarContent = () => {
  const [isAddCollectionOpen, setIsAddCollectionOpen] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState("");
  const collectionInputRef = useRef<HTMLInputElement>(null);

  const collections = useCollectionStore((state) => state.collections);
  const addCollection = useCollectionStore((state) => state.addCollection);

  const [hex, setHex] = useState(DEFAULT_HEX);
  const colorHexClass = colorHexMap[hex];
  const colorClass = colorMap[colorHexClass];

  const searchParams = useSearchParams();
  const currentView = searchParams.get("view") || "all";

  const toggleAddCollection = () => {
    setIsAddCollectionOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isAddCollectionOpen) {
      collectionInputRef.current?.focus();
    }
  }, [isAddCollectionOpen]);

  const handleAddCollection = async () => {
    if (newCollectionName.trim() === "") return;

    const newCollection = {
      collectionName: newCollectionName.trim(),
      collectionColor: colorHexClass,
    };

    await addCollection(newCollection);

    setNewCollectionName("");
    setHex(DEFAULT_HEX);
    toggleAddCollection();
  };

  return (
    <div className="mt-4">
      {/* tasks */}
      <div>
        <p className="font-bold text-sm text-foreground">TASK</p>

        <div className="flex flex-col my-2 gap-1">
          <SideBarItem
            title="All Tasks"
            icon={<ListTodo size={18} />}
            href={"?view=all"}
          />
          <SideBarItem
            title="Upcoming"
            icon={<ChevronsRight size={18} />}
            href={"?view=upcoming"}
          />
          <SideBarItem
            title="Today"
            icon={<BookOpen size={18} />}
            href={"?view=today"}
          />
          <SideBarItem
            title="Completed"
            icon={<Check size={18} />}
            href={"?view=completed"}
          />
        </div>
      </div>

      <hr className="my-4 border-accent-secondary" />

      {/* collections */}
      <div>
        <div className="flex items-center justify-between">
          <p className="font-bold text-sm text-foreground">COLLECTIONS</p>
          <IconButton icon={<Plus size={20} />} onClick={toggleAddCollection} />
        </div>

        <div className="flex flex-col my-2 gap-1">
          {collections.map((collection) => (
            <SideBarCollectionItem
              key={collection.id}
              id={collection.id}
              title={collection.collectionName}
              collectionColor={collection.collectionColor}
            />
          ))}

          {/* add collection */}
          {isAddCollectionOpen && (
            <div
              className="mt-2 space-y-4 bg-accent-secondary p-2 rounded-md transition-colors duration-200 whitespace-nowrap"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAddCollection();
                }
                if (e.key === "Escape") {
                  toggleAddCollection();
                }
              }}
            >
              <div className="flex items-center gap-2">
                <div className={`${colorClass} w-4 h-3 rounded-sm`} />
                <input
                  type="text"
                  placeholder="New Collection"
                  className="w-full text-gray-200 text-sm font-medium outline-none"
                  ref={collectionInputRef}
                  minLength={1}
                  maxLength={22}
                  value={newCollectionName}
                  onChange={(e) => setNewCollectionName(e.target.value)}
                />

                <IconButton
                  icon={<CornerDownLeft size={18} color={hex} />}
                  onClick={handleAddCollection}
                />
              </div>

              <div className="bg-accent-primary p-2 rounded-md">
                <Circle
                  colors={[
                    "#9CA3AF", // gray
                    "#60A5FA", // blue
                    "#34D399", // green
                    "#FB7185", // red
                    "#F472B6", // pink
                    "#FDE047", // yellow
                    "#FB923C", // orange
                    "#A78BFA", // purple
                  ]}
                  color={hex}
                  onChange={(color) => {
                    setHex(color.hex);
                  }}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "14px",
                  }}
                  pointProps={{
                    style: {
                      width: 10,
                      height: 10,
                    },
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideBarContent;
