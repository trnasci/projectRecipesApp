import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Context from '../context/Context';
import Recomendations from './Recomendations';

export default function RecipeDetails({ match: { params: { id } } }) {
  const history = useHistory();
  const {
    detailsRecipe,
    setDetailsRecipe,
    setIngredient,
    setMeasure,
    ingredient,
    measure,
    // recomendations,
    setRecomendations,
  } = useContext(Context);

  const fetchAPI = async () => {
    // const idMeals = 52772;
    let endPoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    if (history.location.pathname === `/drinks/${id}`) {
      endPoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    }
    const request = await fetch(endPoint);
    const response = await request.json();
    let recipe = 0;
    if (history.location.pathname === `/drinks/${id}`) {
      recipe = response.drinks;
    } else {
      recipe = response.meals;
    }

    const detailsRecipeVerify = history.location.pathname === `/meals/${id}`
      ? response.meals[0] : response.drinks[0];

    setDetailsRecipe(detailsRecipeVerify);
    const filterIngredient = Object.entries(recipe[0]);

    const paoDeQueijo = filterIngredient
      .filter(([key, value]) => (key.includes('strIngredient') && value));
    console.log('ingredients --->', paoDeQueijo);

    const pequi = filterIngredient
      .filter(([key, value]) => (key.includes('strMeasure') && value));
    console.log('Measure --->', pequi);
    setIngredient(paoDeQueijo);
    setMeasure(pequi);
  };

  const fetchRecomendations = async () => {
    let endPoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    if (history.location.pathname === `/drinks/${id}`) {
      endPoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    }

    const request = await fetch(endPoint);
    const response = await request.json();
    const products = history.location.pathname === `/meals/${id}`
      ? response.drinks
      : response.meals;
    setRecomendations(products);
  };

  useEffect(() => {
    fetchAPI();
    fetchRecomendations();
  }, []);
  // console.log(detailsRecipe.strYoutube);
  return (
    <div>
      <div>
        <h3>RecipeDetails</h3>
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
        <h4
          data-testid="recipe-category"
          type="text"
          name=""
          id=""
        >
          {
            history.location.pathname === `/meals/${id}`
              ? detailsRecipe.strCategory
              : detailsRecipe.strAlcoholic
          }
        </h4>
        <ul>
          {
            ingredient.map((e, index) => (
              <li
                key={ index }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {`${e[1]}: ${measure[index][1]}`}
              </li>
            ))
          }
        </ul>

        <h4
          data-testid="instructions"
        >
          {detailsRecipe.strInstructions}
        </h4>

        {
          history.location.pathname === `/meals/${id}`
          && (
            <iframe
              src={ detailsRecipe.strYoutube }
              title="strYoutube"
              data-testid="video"
            >
              youtube
            </iframe>
          )
        }
        <Recomendations />

      </div>
    </div>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
