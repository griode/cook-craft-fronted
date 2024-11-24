"use client";
import { RecipeProvider } from "@/app/data/provider/recipe_provider";
import { useEffect, useState } from "react";
import Image from "next/image";
import Recipe from "@/app/data/model/recipe_model";

export function NutritionCard({
  title,
  icon,
}: {
  title: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center space-x-2">
      <div className="p-2 rounded-lg bg-slate-200 text-black text-2xl">
        {icon}
      </div>
      <h3>{title}</h3>
    </div>
  );
}

export default function RecipeDay() {
  const [recipe, setRecipe] = useState<Recipe>();

  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await RecipeProvider.getRecipeOfDay();
      setRecipe(response);
    };

    fetchRecipe();
  }, []);

  return (
    <div className="px-8 py-4 bg-slate-100 rounded-3xl justify-between flex items-center overflow-hidden w-96 space-x-6">
      <div className="">
        <h1 className="text-xl font-bold text-black/80">{recipe?.name}</h1>
        <p className="mt-2 line-clamp-2">{recipe?.description}</p>
      </div>
      <div className=" bg-slate-200 rounded-full overflow-hidden">
        {recipe == null ? (
          <div></div>
        ) : (
          <Image
            className="object-cover rounded-full"
            src={recipe?.image ?? ""}
            alt={recipe?.name}
            width={1024}
            height={1024}
          />
        )}
      </div>
    </div>
  );
}
