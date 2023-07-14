import React from 'react';
import { useParams } from 'react-router-dom';
import useStore from '../../store/store';

import '../RecipeList/RecipeList.css';

const SingleRecipeCard: React.FC = () => {
  const { id } = useParams<{ id: string | undefined }>();
  const recipeId = id ? parseInt(id) : undefined;
  const recipe = useStore((state) =>
    state.recipes.find((r) => r.id === recipeId)
  );

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <section className="single__recipe-card">
      <h1 className="description__beear">{recipe.name}</h1>
      <div className="img__container">
        <img className="beers__img" src={recipe.image_url} alt={recipe.name} />
      </div>
      <h4 className="description__beear">{recipe.first_brewed}</h4>
      <h4 className="description__beear">{recipe.tagline}</h4>
      <p className="description__beear">{recipe.description}</p>
      <p className="description__beear">
        {' '}
        <b>ABV:</b> {recipe.abv}
      </p>
      <p className="description__beear">
        {' '}
        <b>IBU:</b> {recipe.ibu}
      </p>
      <p className="description__beear">
        {' '}
        <b>Target FG:</b> {recipe.target_fg}
      </p>
      <p className="description__beear">
        {' '}
        <b>Target OG:</b> {recipe.target_og}
      </p>
      <p className="description__beear">
        {' '}
        <b>EBC:</b> {recipe.ebc}
      </p>
      <p className="description__beear">
        {' '}
        <b>SRM:</b> {recipe.srm}
      </p>
      <p className="description__beear">
        {' '}
        <b>pH:</b> {recipe.ph}
      </p>
      <p className="description__beear">
        {' '}
        <b>Attenuation Level:</b> {recipe.attenuation_level}
      </p>
    </section>
  );
};

export default SingleRecipeCard;
