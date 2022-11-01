import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../context/Context';

function Card() {
  const {
    listMeals,
    listDrinks,
    title,
  } = useContext(Context);
  const history = useHistory();

  const handleCardClickMeal = (id) => {
    history.push(`/meals/${id}`);
  };

  const handleCardClickDrink = (id) => {
    history.push(`/drinks/${id}`);
  };
  return (
    <section>
      { title === 'Meals'
        ? listMeals.map((element, index) => (
          <button
            key={ element.idMeal }
            data-testid={ `${index}-recipe-card` }
            type="button"
            onClick={ () => handleCardClickMeal(element.idMeal) }
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
          </button>
        )) : listDrinks.map((element, index) => (
          <button
            key={ element.idDrink }
            data-testid={ `${index}-recipe-card` }
            type="button"
            onClick={ () => handleCardClickDrink(element.idDrink) }
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
          </button>
        ))}
    </section>
  );
}

export default Card;
