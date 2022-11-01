import React, { useEffect, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';

function FavoriteAndDoneCard() {
  const history = useHistory();
  const [recipeList, setRecipeList] = useState([]);

  const { location: { pathname } } = history;

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
            <p data-testid={ `${index}-horizontal-top-text` }>{ element.category }</p>
            <p data-testid={ `${index}-horizontal-name` }>{ element.name }</p>
            <p data-testid={ `${index}-horizontal-done-date` }>{ element.doneDate }</p>
            <button
              type="button"
              data-testid={ `${index}-horizontal-share-btn"` }
            >
              Compartilhar
            </button>
            { element.tags.map((eTag, iTag) => (
              <p
                key={ iTag }
                data-testid={ `${iTag}-${eTag}-horizontal-tag` }
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
            <p data-testid={ `${index}-horizontal-top-text` }>{ element.category }</p>
            <p data-testid={ `${index}-horizontal-name` }>{ element.name }</p>
            <button
              type="button"
              data-testid={ `${index}-horizontal-share-btn"` }
            >
              Compartilhar
            </button>
            <button
              type="button"
              data-testid={ `${index}-horizontal-favorite-btn"` }
            >
              Favoritar
            </button>
          </div>
        ))}
    </section>
  );
}

export default FavoriteAndDoneCard;
