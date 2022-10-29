import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Context from '../context/Context';
import Recomendations from './Recomendations';
import Buttons from './Buttons';

// const copy = require('clipboard-copy');

export default function RecipeDetails({ match: { params: { id } } }) {
  const history = useHistory();
  const { location: { pathname } } = history;
  const {
    detailsRecipe, setDetailsRecipe, setIngredient, setMeasure, ingredient, measure,
    setRecomendations, copyBtn, favorite, setFavorite } = useContext(Context);

  const fetchAPI = async () => {
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
    const pequi = filterIngredient
      .filter(([key, value]) => (key.includes('strMeasure') && value));
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

  const verifyFavorite = () => {
    const favoriteStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteStorage) {
      setFavorite(favoriteStorage.some((e) => e.id === id));
    }
  };

  useEffect(() => {
    fetchAPI();
    fetchRecomendations();
    verifyFavorite();
  }, []);

  const handleClickLocalStorage = () => {
    const objLocalStorage = {
      drinks: {},
      meals: {},
    };
    const itemProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (itemProgress === null) {
      if (history.location.pathname === `/meals/${id}/in-progress`) {
        objLocalStorage.meals[id] = [];
        localStorage.setItem('inProgressRecipes', JSON.stringify(objLocalStorage));
      }
      if (history.location.pathname === `/drinks/${id}/in-progress`) {
        objLocalStorage.drinks[id] = [];
        localStorage.setItem('inProgressRecipes', JSON.stringify(objLocalStorage));
      }
    }
    if (history.location.pathname === `/meals/${id}/in-progress`) {
      itemProgress.meals = {
        ...itemProgress.meals,
        [id]: [],
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(itemProgress));
    }
    if (history.location.pathname === `/drinks/${id}/in-progress`) {
      itemProgress.drinks = {
        ...itemProgress.drinks, [id]: [],
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(itemProgress));
    }
    if (history.location.pathname === `/meals/${id}`) {
      history.push(`/meals/${id}/in-progress`);
    } else {
      history.push(`/drinks/${id}/in-progress`);
    }
  };

  const verifyButton = () => {
    const verifyId = JSON.parse(localStorage.getItem('inProgressRecipes'));
    let idKeys = [];
    if (verifyId && history.location.pathname === `/meals/${id}`) {
      idKeys = Object.keys(verifyId.meals);
    }
    if (verifyId && history.location.pathname === `/drinks/${id}`) {
      idKeys = Object.keys(verifyId.drinks);
    }
    return idKeys.some((i) => i === id);
  };

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
        {
          copyBtn && <div>Link copied!</div>
        }
        <Recomendations />
        <div className="start-recipe-btn">
          { verifyButton() ? (
            <button
              className="btn-fixed"
              type="button"
              data-testid="start-recipe-btn"
              onClick={ handleClickLocalStorage }
            >
              Continue Recipe
            </button>
          ) : (
            <button
              className="btn-fixed"
              type="button"
              data-testid="start-recipe-btn"
              onClick={ handleClickLocalStorage }
            >
              Start Recipe
            </button>
          )}
          <Buttons
            obj={ {
              id, pathname, favorite, setFavorite, detailsRecipe,
            } }
          />
        </div>
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
