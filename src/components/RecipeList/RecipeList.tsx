import React, { useEffect, useState } from 'react';
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
  const [currentPage, setCurrentPage] = useState(1);
  const recipes = useStore((state) => state.recipes);
  const loadRecipes = useStore((state) => state.loadRecipes);
  const fetchMoreRecipes = useStore((state) => state.fetchMoreRecipes);
  const removeRecipe = useStore((state) => state.removeRecipe);

  const navigate = useNavigate();

  useEffect(() => {
    loadRecipes();
  }, []);

  useEffect(() => {
    if (recipes.length === 0) {
      setCurrentPage((prevPage) => prevPage + 1);
      fetchMoreRecipes(currentPage + 1);
    }
  }, [recipes]);

  const handleRightClick = (recipeId: number) => (event: React.MouseEvent) => {
    event.preventDefault();
    if (selectedRecipes.includes(recipeId)) {
      setSelectedRecipes((prevSelectedRecipes) =>
        prevSelectedRecipes.filter((id) => id !== recipeId)
      );
    } else {
      setSelectedRecipes((prevSelectedRecipes) => [
        ...prevSelectedRecipes,
        recipeId,
      ]);
    }
  };

  const handleLeftClick = (recipeId: number) => {
    navigate(`/recipes/${recipeId}`);
  };

  const handleDeleteClick = (recipeId: number) => {
    removeRecipe(recipeId);
    setSelectedRecipes((prevSelectedRecipes) =>
      prevSelectedRecipes.filter((id) => id !== recipeId)
    );
  };

  const handleDeleteSelected = () => {
    selectedRecipes.forEach((recipeId) => {
      removeRecipe(recipeId);
    });
    setSelectedRecipes([]);
  };

  return (
    <main className='card__container'>
      {recipes.slice(0, 15).map((recipe: Recipe) => (
        <section
          key={recipe.id}
          className={`recipe-card ${
            selectedRecipes.includes(recipe.id) ? 'selected' : ''
          }`}
          onContextMenu={handleRightClick(recipe.id)}
        >
          <img className='beers__img' src={recipe.image_url} alt={recipe.name} />
          <h3>{recipe.name}</h3>
          <h4>{recipe.first_brewed}</h4>
          <h4>{recipe.tagline}</h4>
          <p>{recipe.description}</p>
        
          {!selectedRecipes.includes(recipe.id) && (
            <button
              className='view__btn'
              onClick={() => handleLeftClick(recipe.id)}
            >
              View details
            </button>
          )}
        </section>
      ))}
      {selectedRecipes.length > 0 && (
        <button className='delete-selected__btn' onClick={handleDeleteSelected}>
          Delete Selected
        </button>
      )}
    </main>
  );
};

export default RecipeList;
