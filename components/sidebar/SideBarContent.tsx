"use client";

import {
  BookOpen,
  Check,
  ChevronsRight,
  CornerDownLeft,
  ListTodo,
  Plus,
} from "lucide-react";
import { useState, Dispatch, SetStateAction, useRef, useEffect } from "react";
import IconButton from "../IconButton";
import Circle from "@uiw/react-color-circle";
import { colorHexMap, colorMap } from "@/utils/colorMap";
import SideBarItem from "./SideBarItem";
import SideBarCollection from "./SideBarCollection";

interface Collection {
  title: string;
  color: string;
}

interface SideBarContentProps {
  collections: Collection[];
  setCollections: Dispatch<SetStateAction<Collection[]>>;
}

const SideBarContent = ({
  collections,
  setCollections,
}: SideBarContentProps) => {
  const [isAddCollectionOpen, setIsAddCollectionOpen] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState("");
  const collectionInputRef = useRef<HTMLInputElement>(null);

  const [hex, setHex] = useState("#9ca3af"); // default to gray
  const colorHexClass = colorHexMap[hex];
  const colorClass = colorMap[colorHexClass];

  const toggleAddCollection = () => {
    setIsAddCollectionOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isAddCollectionOpen) {
      collectionInputRef.current?.focus();
    }
  }, [isAddCollectionOpen]);

  const handleAddCollection = () => {
    if (newCollectionName.trim() === "") return;

    const newCollection: Collection = {
      title: newCollectionName,
      color: colorHexClass,
    };

    setCollections([...collections, newCollection]);
    setNewCollectionName("");
    setHex("#9ca3af");
    toggleAddCollection();
  };

  return (
    <div className="mt-4">
      {/* tasks */}
      <div>
        <p className="font-bold text-sm text-foreground">TASK</p>

        <div className="flex flex-col my-2">
          <SideBarItem title="All Tasks" icon={<ListTodo size={18} />} />
          <SideBarItem title="Upcoming" icon={<ChevronsRight size={18} />} />
          <SideBarItem title="Today" icon={<BookOpen size={18} />} />
          <SideBarItem title="Completed" icon={<Check size={18} />} />
        </div>
      </div>

      <hr className="my-4 border-gray-700" />

      {/* collections */}
      <div>
        <div className="flex items-center justify-between">
          <p className="font-bold text-sm text-foreground">COLLECTIONS</p>
          <IconButton icon={<Plus size={20} />} onClick={toggleAddCollection} />
        </div>

        <div className="flex flex-col my-2">
          {collections.map((collection) => (
            <SideBarCollection
              key={collection.title}
              title={collection.title}
              collectionColor={collection.color}
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
                <div className={`${colorClass} w-2.5 h-2.5 rounded-full`} />
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
