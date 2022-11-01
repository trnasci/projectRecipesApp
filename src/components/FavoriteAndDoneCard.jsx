import React, { useEffect, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteAndDoneCard() {
  const history = useHistory();
  const [recipeList, setRecipeList] = useState([]);

  const { location: { pathname } } = history;

  const maxTag = 2;

  const getRecipeList = (useCallback(async () => {
    if (pathname === '/favorite-recipes') {
      setRecipeList(JSON.parse(localStorage.getItem('favoriteRecipes')));
    }
    if (pathname === '/done-recipes') {
      setRecipeList(JSON.parse(localStorage.getItem('doneRecipes')));
    }
  }, [pathname]));

  useEffect(() => {
    getRecipeList();
  }, [getRecipeList]);

  console.log(recipeList);

  return (
    <section>
      <div>
        <button
          data-testid="filter-by-all-btn"
          type="button"
        >
          All
        </button>
        <button
          data-testid="filter-by-meal-btn"
          type="button"
        >
          Meals
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
        >
          Drinks
        </button>
      </div>
      { pathname === '/done-recipes'
        ? recipeList.map((element, index) => (
          <div key={ Math.random() }>
            <img
              data-testid={ `${index}-horizontal-image` }
              width="150"
              src={ element.image }
              alt={ element.name }
            />
            <p
              data-testid={ `${index}-horizontal-top-text` }
            >
              { `${element.nationality} -
               ${element.category} - 
               ${element.alcoholicOrNot} ` }

            </p>
            <p data-testid={ `${index}-horizontal-name` }>{ element.name }</p>
            <p data-testid={ `${index}-horizontal-done-date` }>{ element.doneDate }</p>
            <button
              type="button"
            >
              <img
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                alt="share-btn"
              />
            </button>
            { (element.tags).slice(0, maxTag).map((eTag, iTag) => (
              <p
                key={ iTag }
                data-testid={ `${index}-${eTag}-horizontal-tag` }
              >
                { eTag }

              </p>
            )) }
          </div>
        ))
        : recipeList.map((element, index) => (
          <div key={ Math.random() }>
            <img
              data-testid={ `${index}-horizontal-image` }
              width="150"
              src={ element.image }
              alt={ element.name }
            />
            <p
              data-testid={ `${index}-horizontal-top-text` }
            >
              { `${element.nationality} -
               ${element.category} - 
               ${element.alcoholicOrNot} ` }

            </p>
            <p data-testid={ `${index}-horizontal-name` }>{ element.name }</p>
            <button
              type="button"
            >
              <img
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                alt="share-btn"
              />
            </button>
            <button
              type="button"
            >
              <img
                data-testid={ `${index}-horizontal-favorite-btn` }
                src={ blackHeartIcon }
                alt="favorite-btn"
              />
            </button>
          </div>
        ))}
    </section>
  );
}

export default FavoriteAndDoneCard;
