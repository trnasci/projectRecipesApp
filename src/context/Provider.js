import PropTypes from 'prop-types';
import { useState, useMemo, useCallback } from 'react';
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
  const [listAPI, setListAPI] = useState([]);
  const history = useHistory();
  const location = useLocation();
  const { pathname } = location;

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
    console.log(pathname, radioInput);
    const endPoint = '';
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
      console.log(endPoint);
      // return endPoint;
    }
  }, [pathname, radioInput, searchInput]);

  const fetchAPI = useCallback(async () => {
    const URL = mealNDrinks();
    const request = await fetch(URL);
    console.log(request);
    // const verifica = Object.keys(response)[0];

    if (pathname === '/meals') {
      const { meals } = await request.json();
      setListAPI(meals);
    } else {
      const { drinks } = await request.json();
      setListAPI(drinks);
    }
  }, [mealNDrinks, pathname]);

  const handleClickAPI = useCallback(async () => {
    if (radioInput === FIRST_LETTER && searchInput.length > 1) {
      return global.alert('Your search must have only 1 (one) character');
    }
    await fetchAPI();
    console.log('listAPI', listAPI);
  }, [fetchAPI, listAPI, radioInput, searchInput.length]);

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
    listAPI,
  }), [email,
    password,
    disabled,
    handleChangeEmail,
    handleChangePassword,
    handleDisabled,
    handleClick,
    handleClickAPI,
    title,
    setTitle,
    haveSearchIcon,
    setHaveSearchIcon,
    setRadioInput,
    searchInput,
    setSearchInput,
    listAPI,
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
