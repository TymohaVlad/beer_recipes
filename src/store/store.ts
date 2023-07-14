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
  loadRecipes: () => Promise<void>;
  addRecipe: (recipe: Recipe) => void;
  removeRecipe: (recipeId: number) => void;
  fetchMoreRecipes: (page: number) => Promise<void>;
}

const useStore = create<Store>((set) => ({
  recipes: [],

  addRecipe: (recipe) => {
    set((state) => ({ recipes: [...state.recipes, recipe] }));
  },

  loadRecipes: async () => {
    try {
      const response = await fetch('https://api.punkapi.com/v2/beers?page=1');
      const data = await response.json();
      set({ recipes: data });
    } catch (error) {
      console.error('Error loading recipes:', error);
    }
  },

  removeRecipe: (recipeId) => {
    set((state) => ({
      recipes: state.recipes.filter((recipe) => recipe.id !== recipeId),
    }));
  },

  fetchMoreRecipes: async (page) => {
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
