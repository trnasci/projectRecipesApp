import React, { useContext } from 'react';
import Context from '../context/Context';

function Card() {
  const {
    listMeals,
    listDrinks,
    title,
  } = useContext(Context);
  return (
    <section>
      { title === 'Meals'
        ? listMeals.map((element, index) => (
          <div
            key={ index }
            data-testid={ `${index}-recipe-card` }
          >
            <img
              width="150"
              alt="Foto do Alimento"
              src={ element.strMealThumb }
              data-testid={ `${index}-card-img` }
            />
            <h2
              data-testid={ `${index}-card-name` }
            >
              {element.strMeal}
            </h2>
          </div>
        )) : listDrinks.map((element, index) => (
          <div
            key={ index }
            data-testid={ `${index}-recipe-card` }
          >
            <img
              width="150"
              alt="Foto do Drink"
              src={ element.strDrinkThumb }
              data-testid={ `${index}-card-img` }
            />
            <h2
              data-testid={ `${index}-card-name` }
            >
              {element.strDrink}
            </h2>
          </div>
        ))}
    </section>
  );
}

export default Card;
