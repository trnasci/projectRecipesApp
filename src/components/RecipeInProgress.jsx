import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Context from '../context/Context';
import SetInProgress from '../assets/SetInProgress';
import Buttons from './Buttons';
import LocalStorageDoneRecipes from '../assets/LocalStorageDoneRecipes';

function RecipeInProgress({ match }) {
// recommitando
  const history = useHistory();
  const { params: { id } } = match;
  const {
    detailsRecipe,
    setDetailsRecipe,
    ingredient,
    setIngredient,
    favorite,
    setFavorite,
    copyBtn,
  } = useContext(Context);

  const [disabledBtn, setDisabled] = useState(false);

  const { location: { pathname } } = history;

  const objValues = (obj) => {
    console.log('obj', obj);
    const filterIngredient = Object.entries(obj);
    console.log('issoaqui', filterIngredient);

    const paoDeQueijo = filterIngredient
      .filter(([key, value]) => (key.includes('strIngredient') && value));
    setIngredient(paoDeQueijo);
  };

  const fetchAPI = async () => {
    let endPoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    if (history.location.pathname === `/drinks/${id}/in-progress`) {
      endPoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    }
    const request = await fetch(endPoint);
    const response = await request.json();
    const redirect = history.location.pathname === `/meals/${id}/in-progress`
      ? response.meals[0]
      : response.drinks[0];
    setDetailsRecipe(redirect);
    objValues(redirect);
  };

  const handleChecked = (ingredientName) => {
    const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (pathname === `/meals/${id}/in-progress`
    && inProgress && inProgress.meals[id]) {
      return inProgress.meals[id]?.some((el) => el === ingredientName);
    }
    if (pathname === `/drinks/${id}/in-progress`
    && inProgress && inProgress.drinks[id]) {
      return inProgress.drinks[id]?.some((el) => el === ingredientName);
    }
  };

  const handleClassChecked = (ingredientName) => {
    const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (pathname === `/meals/${id}/in-progress` && inProgress) {
      return inProgress.meals[id]?.some((it) => it === ingredientName) ? 'checked' : '';
    }
    if (pathname === `/drinks/${id}/in-progress` && inProgress) {
      return inProgress.drinks[id]?.some((it) => it === ingredientName) ? 'checked' : '';
    }
  };

  const verifyChecked = () => {
    const allInputs = document.querySelectorAll('[id*="inputs"]');
    if (allInputs.length > 0) {
      const array = [];
      allInputs.forEach((r) => array.push(r.checked));
      setDisabled(array.every((j) => j === true));
    }
  };

  const verifyFavorite = () => {
    const favoriteStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteStorage) {
      setFavorite(favoriteStorage.some((e) => e.id === id));
    }
  };

  useEffect(() => {
    fetchAPI();
    verifyChecked();
    verifyFavorite();
  }, []);

  // setDetailsRecipe(
  //   history.location.pathname === `/meals/${id}/in-progress`
  //     ? response.meals[0]
  //     : response.drinks[0],
  // );
  // useEffect(() => { fetchAPI(); }, []);

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
        width="150"
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
      {/* <button
        data-testid="share-btn"
        type="button"
        onClick={ () => {
          copy(window.location.href.replace('/in-progress', ''));
          setCopyBtn(!copyBtn);
        } }
      >
        <img
          src={ shareIcon }
          alt="icon"
        />
      </button>
      <button
        data-testid="favorite-btn"
        type="button"
      >
        Favoritar
      </button> */}
      {
        copyBtn && <div>Link copied!</div>
      }
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
      <div
        onChange={ verifyChecked }
      >
        {
          ingredient?.map((e, i) => (
            <label
              className={ handleClassChecked(e[1]) }
              htmlFor={ `inputs ${i}` }
              key={ i }
              data-testid={ `${i}-ingredient-step` }
            >
              <input
                id={ `inputs ${i}` }
                type="checkbox"
                name={ e[1] }
                onChange={ (event) => SetInProgress(event, pathname, id, e[1]) }
                defaultChecked={ handleChecked(e[1]) }
              />
              {e[1]}
            </label>
          ))
        }
      </div>
      <div className="start-recipe-btn">
        <Buttons
          obj={ {
            id, pathname, favorite, setFavorite, detailsRecipe,
          } }
        />
        <button
          data-testid="finish-recipe-btn"
          type="button"
          className="btn-fixed"
          disabled={ !disabledBtn }
          onClick={ () => LocalStorageDoneRecipes(id, pathname, detailsRecipe, history) }
        >
          Finalizar
        </button>
      </div>
    </div>
  );
}

RecipeInProgress.propTypes = {
  match: PropTypes.shape.isRequired,
};

export default RecipeInProgress;
// id: 52772
