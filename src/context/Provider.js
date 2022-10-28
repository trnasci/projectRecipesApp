import PropTypes from 'prop-types';
import { useState, useMemo, useCallback, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Context from './Context';

function Provider({ children }) {
  const FIRST_LETTER = 'First letter';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [radioInput, setRadioInput] = useState('');
  const [title, setTitle] = useState('');
  const [haveSearchIcon, setHaveSearchIcon] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [listMeals, setListMeals] = useState([]);
  const [listDrinks, setListDrinks] = useState([]);
  const [detailsRecipe, setDetailsRecipe] = useState([]);
  const [ingredient, setIngredient] = useState([]);
  const [measure, setMeasure] = useState([]);
  const history = useHistory();
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    if (listDrinks.length === 1 && radioInput !== 'Category') {
      history.push(`/drinks/${listDrinks[0].idDrink}`);
    }
    if (listMeals.length === 1 && radioInput !== 'Category') {
      history.push(`/meals/${listMeals[0].idMeal}`);
    }
  }, [history, listDrinks, listMeals, pathname, title, radioInput]);

  const handleDisabled = useCallback(() => {
    const validationEmail = /\S+@\S+\.\S+/;
    const emailInput = validationEmail.test(email);
    const CHARACTER_LIMIT = 6;
    const passwordInput = password.length >= CHARACTER_LIMIT;
    const totalValidation = emailInput && passwordInput;
    if (totalValidation) {
      setDisabled(false);
    }
  }, [email, password.length]);

  const handleChangeEmail = useCallback(({ target }) => {
    const { value } = target;
    setEmail(value);
    handleDisabled();
  }, [handleDisabled]);

  const handleChangePassword = useCallback(({ target }) => {
    const { value } = target;
    setPassword(value);
    handleDisabled();
  }, [handleDisabled]);

  const handleClick = useCallback(() => {
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/meals');
  }, [email, history]);

  const mealNDrinks = useCallback(() => {
    if (pathname === '/meals') {
      switch (radioInput) {
      case 'Ingredient':
        return `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`;
      case 'Name':
        return `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`;
      case FIRST_LETTER:
        return `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInput}`;
      default:
        break;
      }
    }
    if (pathname === '/drinks') {
      switch (radioInput) {
      case 'Ingredient':
        return `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchInput}`;
      case 'Name':
        return `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput}`;
      case FIRST_LETTER:
        return `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchInput}`;
      default:
        break;
      }
    }
  }, [pathname, radioInput, searchInput]);

  const fetchAPI = useCallback(async () => {
    const URL = mealNDrinks();
    const request = await fetch(URL);
    const maxRender = 12;
    const alert = 'Sorry, we haven\'t found any recipes for these filters.';
    if (pathname === '/meals') {
      const { meals } = await request.json();
      if (!meals) {
        return global.alert(alert);
      }
      if (meals.length > maxRender) {
        setListMeals(meals.slice(0, maxRender));
      } else {
        setListMeals(meals);
      }
    } else {
      const { drinks } = await request.json();
      if (!drinks) {
        return global.alert(alert);
      }
      if (drinks.length > maxRender) {
        setListDrinks(drinks.slice(0, maxRender));
      } else {
        setListDrinks(drinks);
      }
    }
  }, [mealNDrinks, pathname]);

  const handleClickAPI = useCallback(async () => {
    if (radioInput === FIRST_LETTER && searchInput.length > 1) {
      return global.alert('Your search must have only 1 (one) character');
    }
    await fetchAPI();
  }, [fetchAPI, radioInput, searchInput.length]);

  const contextState = useMemo(() => ({
    email,
    password,
    disabled,
    handleChangeEmail,
    handleChangePassword,
    handleDisabled,
    handleClick,
    title,
    setTitle,
    haveSearchIcon,
    setHaveSearchIcon,
    setRadioInput,
    searchInput,
    setSearchInput,
    handleClickAPI,
    listDrinks,
    listMeals,
    detailsRecipe,
    setDetailsRecipe,
    setIngredient,
    setMeasure,
    ingredient,
    measure,
    fetchAPI,
    setListMeals,
    setListDrinks,
  }), [
    email,
    password,
    disabled,
    handleChangeEmail,
    handleChangePassword,
    handleDisabled,
    handleClick,
    title,
    haveSearchIcon,
    searchInput,
    handleClickAPI,
    listDrinks,
    listMeals,
    detailsRecipe,
    setDetailsRecipe,
    setIngredient,
    setMeasure,
    ingredient,
    measure,
    fetchAPI,
    setSearchInput,
  ]);

  return (
    <Context.Provider value={ contextState }>
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
