import { GiBlackBook } from "react-icons/gi";
import {
  MdOutlineDinnerDining,
  MdOutlineFreeBreakfast,
  MdOutlineLunchDining,
} from "react-icons/md";
import { LuDessert, LuSalad, LuSoup } from "react-icons/lu";
import { LiaDrumstickBiteSolid } from "react-icons/lia";
import React from "react";

type Category = {
  isActive: boolean;
  id: number;
  name: string;
  icon: React.ReactNode;
};

export const Categories: Category[] = [
  {
    isActive: false,
    id: 0,
    name: "All Recipes",
    icon: <GiBlackBook />,
  },
  {
    isActive: false,
    id: 1,
    name: "Breakfast",
    icon: <MdOutlineFreeBreakfast />,
  },
  {
    isActive: false,
    id: 2,
    name: "Lunch",
    icon: <MdOutlineLunchDining />,
  },
  {
    isActive: false,
    id: 3,
    name: "Dinner",
    icon: <MdOutlineDinnerDining />,
  },
  {
    isActive: false,
    id: 4,
    name: "Dessert",
    icon: <LuDessert />,
  },
  {
    isActive: false,
    id: 5,
    name: "Snack",
    icon: <LiaDrumstickBiteSolid />,
  },
  {
    isActive: false,
    id: 6,
    name: "Soup",
    icon: <LuSoup />,
  },
  {
    isActive: false,
    id: 7,
    name: "Vegan",
    icon: <LuSalad />,
  },
];

export const CategoryItem = ({
  category,
  onClick,
}: {
  category: Category;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}) => {
  return (
    <div
      onClick={onClick}
      className={`${
        category.isActive
          ? "text-white bg-slate-900 font-semibold"
          : "text-slate-500"
      } flex flex-row items-center justify-center cursor-pointer border p-2 gap-1 rounded-lg`}
    >
      <div className={"text-xl"}>{category.icon}</div>
      <p className={"text-xs text-center"}>{category.name}</p>
    </div>
  );
};