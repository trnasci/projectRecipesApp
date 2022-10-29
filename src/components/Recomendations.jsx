import React, { useContext } from 'react';
import Context from '../context/Context';

function Recomendations() {
  const {
    recomendations,
  } = useContext(Context);
  const SEIS = 6;
  return (
    <div className="carousel">
      { console.log(recomendations) }
      {
        recomendations.slice(0, SEIS).map((e, i) => (
          <div key={ i }>
            <p data-testid={ `${i}-recommendation-title` }>
              {
                e.strMeal ? e.strMeal : e.strDrink
              }
            </p>
            <img
              data-testid={ `${i}-recommendation-card` }
              width={ 182 }
              src={ e.strMealThumb ? e.strMealThumb : e.strDrinkThumb }
              alt={ i }
            />
          </div>
        ))
      }
    </div>
  );
}

export default Recomendations;
