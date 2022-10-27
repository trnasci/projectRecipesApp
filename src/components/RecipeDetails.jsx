import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Context from '../context/Context';

export default function RecipeDetails({ match: { params: { id } } }) {
  const history = useHistory();
  const {
    detailsRecipe,
    setDetailsRecipe,
  } = useContext(Context);

  const fetchAPI = async () => {
    // const idMeals = 52772;
    let endPoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    if (history.location.pathname === `/drinks/${id}`) {
      endPoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    }
    const request = await fetch(endPoint);
    const response = await request.json();
    setDetailsRecipe(
      history.location.pathname === `/meals/${id}`
        ? response.meals[0]
        : response.drinks[0],
    );
    console.log('response --->', response);
  };
  useEffect(() => { fetchAPI(); }, []);

  return (
    <div>RecipeDetails</div>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
