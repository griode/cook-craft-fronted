"use client";
import NavbarContainer from "@/app/components/navbar_container";
import RecipeCardX from "@/app/components/recipe_cardx";
import Recipe from "@/app/data/model/recipe_model";
import { RecipeProvider } from "@/app/data/provider/recipe_provider";
import { useEffect, useState } from "react";
import RecipeDay from "./recipe_day";
import "@/app/scroll-style.css"; // Import the CSS file

export default function HomePage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const fetchRecipes = async () => {
    const response = await RecipeProvider.getRecipes({ item: 6 });
    setRecipes(response);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <NavbarContainer pageIndex={0}>
      
        <RecipeDay />
        <h1 className="mt-8 text-xl font-bold">Recent Recipes</h1>
        {/* Horizontal scroll for recipes */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 overflow-y-scroll py-2">
          {recipes.map((recipe, index) => (
            <RecipeCardX key={index} recipe={recipe} />
          ))}
        </div>
      
    </NavbarContainer>
  );
}
