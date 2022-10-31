import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Context from '../context/Context';

function RecipeInProgress({ match }) {
  const history = useHistory();
  const { params: { id } } = match;
  const {
    detailsRecipe,
    setDetailsRecipe,
  } = useContext(Context);

  const fetchAPI = async () => {
    let endPoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    if (history.location.pathname === `/drinks/${id}/in-progress`) {
      endPoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    }
    const request = await fetch(endPoint);
    const response = await request.json();
    setDetailsRecipe(
      history.location.pathname === `/meals/${id}/in-progress`
        ? response.meals[0]
        : response.drinks[0],
    );
    console.log('response --->', response);
  };
  useEffect(() => { fetchAPI(); }, []);
  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={
          detailsRecipe.strMealThumb
            ? detailsRecipe.strMealThumb
            : detailsRecipe.strDrinkThumb
        }
        alt="recipe"
      />
      <h2
        data-testid="recipe-title"
      >
        {
          detailsRecipe.strMeal
            ? detailsRecipe.strMeal
            : detailsRecipe.strDrink
        }
      </h2>
      <button
        data-testid="share-btn"
        type="button"
      >
        compartilhar
      </button>
      <button
        data-testid="favorite-btn"
        type="button"
      >
        Favoritar
      </button>
      <h4
        data-testid="recipe-category"
        type="text"
        name=""
        id=""
      >
        {
          history.location.pathname === `/meals/${id}/in-progress`
            ? detailsRecipe.strCategory
            : detailsRecipe.strAlcoholic
        }
      </h4>
      <h4
        data-testid="instructions"
      >
        { detailsRecipe.strInstructions }
      </h4>
      <button
        data-testid="finish-recipe-btn"
        type="button"
      >
        Finalizar
      </button>
    </div>
  );
}

RecipeInProgress.propTypes = {
  match: PropTypes.shape.isRequired,
};

export default RecipeInProgress;
// id: 52772
