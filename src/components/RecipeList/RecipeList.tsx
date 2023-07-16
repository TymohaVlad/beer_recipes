import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../store/store';
import './RecipeList.css';

interface Recipe {
  id: number;
  name: string;
  description: string;
  image_url: string;
  tagline: string;
  abv: number;
  ibu: number;
  food_pairing: string[];
  first_brewed: string;
}

const RecipeList: React.FC = () => {
  const [selectedRecipes, setSelectedRecipes] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const loadindIndicator = useRef(false);

  const recipes = useStore((state) => state.recipes);
  const fetchRecipes = useStore((state) => state.fetchRecipes);
  const removeRecipes = useStore((state) => state.removeRecipes);

  const navigate = useNavigate();

  useEffect(() => {
    if (!loadindIndicator.current && recipes.length === 0) {
      loadindIndicator.current = true;
      const page = currentPage + 1;
      setCurrentPage(() => page);
      fetchRecipes(page).finally(() => {
        loadindIndicator.current = false;
      });
    }
  }, [recipes]);

  const handleCardClick = (recipeId: number) => {
    navigate(`/recipes/${recipeId}`);
  };

  const handleRightClick = (recipeId: number) => (event: React.MouseEvent) => {
    event.preventDefault();
    if (selectedRecipes.includes(recipeId)) {
      setSelectedRecipes((prevSelectedRecipes) =>
        prevSelectedRecipes.filter((id) => id !== recipeId)
      );
      return;
    }

    setSelectedRecipes((prevSelectedRecipes) => [
      ...prevSelectedRecipes,
      recipeId,
    ]);
  };

  const handleDeleteSelected = () => {
    removeRecipes(new Set(selectedRecipes));
    setSelectedRecipes([]);
  };

  return (
    <main className="card__container">
      {recipes.slice(0, 15).map((recipe: Recipe) => (
        <section
          key={recipe.id}
          className={`recipe-card ${
            selectedRecipes.includes(recipe.id) ? 'selected' : ''
          }`}
          onClick={() => handleCardClick(recipe.id)}
          onContextMenu={handleRightClick(recipe.id)}
        >
          <img
            className="beers__img"
            src={recipe.image_url}
            alt={recipe.name}
          />
          <h3>{recipe.name}</h3>
          <h4>{recipe.first_brewed}</h4>
          <h4>{recipe.tagline}</h4>
        </section>
      ))}
      {selectedRecipes.length > 0 && (
        <button className="delete-selected__btn" onClick={handleDeleteSelected}>
          Delete Selected
        </button>
      )}
    </main>
  );
};

export default RecipeList;
