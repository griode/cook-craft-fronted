import Recipe from "../model/recipe_model";

export function mapRecipes(data: Map<string, unknown>[]): Recipe[] {
    const recipes: Recipe[] = [];
    for (const jsonData of data) {
        const recipe = Recipe.fromJson(jsonData);
        recipes.push(recipe);
    }
    return recipes;
};
