import { CiTimer, CiUser } from "react-icons/ci";
import Recipe from "../data/model/recipe_model";
import Image from "next/image";

export default function RecipeCardX({ recipe }: { recipe: Recipe }) {
  return (
    <div className="w-60 bg-slate-100 rounded-3xl p-1">
      <div className="w-full h-56 bg-slate-300 rounded-3xl overflow-hidden">
        <Image
          className="object-cover w-full h-full"
          src={recipe.image ?? ""}
          alt={recipe.name}
          width={800}
          height={800}
        />
      </div>
      <h1 className="m-2 font-medium line-clamp-1">{recipe.name}</h1>
      <div className="text-xs text-gray-500 m-2 flex space-x-2">
        <div className="flex items-center space-x-1">
          <CiTimer />
          <span>{`${recipe.duration} min`}</span>
        </div>
        <div className="flex items-center space-x-1">
          <CiUser />
          <span>{`${recipe.servings} reviews`}</span>
        </div>
      </div>
    </div>
  );
}
