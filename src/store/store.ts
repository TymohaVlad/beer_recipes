import create from 'zustand';

interface Recipe {
  id: number;
  name: string;
  description: string;
  image_url: string;
  tagline: string;
  abv: number;
  ibu: number;
  first_brewed: string;
  target_fg: number;
  target_og: number;
  ebc: number;
  srm: number;
  ph: number;
  attenuation_level: number;
  food_pairing: string[];
}

interface Store {
  recipes: Recipe[];
  addRecipe: (recipe: Recipe) => void;
  removeRecipes: (recipeIds: Set<number>) => void;
  fetchRecipes: (page: number) => Promise<void>;
}

const useStore = create<Store>((set) => ({
  recipes: [],

  addRecipe: (recipe) => {
    set((state) => ({ recipes: [...state.recipes, recipe] }));
  },

  removeRecipes: (recipeIdsToDelete) => {
    set((state) => ({
      recipes: state.recipes.filter(
        (recipe) => !recipeIdsToDelete.has(recipe.id)
      ),
    }));
  },

  fetchRecipes: async (page: number) => {
    try {
      const response = await fetch(
        `https://api.punkapi.com/v2/beers?page=${page}`
      );
      const data = await response.json();
      set((state) => ({ recipes: [...state.recipes, ...data] }));
    } catch (error) {
      console.error('Error fetching more recipes:', error);
    }
  },
}));

export default useStore;
