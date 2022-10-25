import PropTypes from 'prop-types';
import { useState, useMemo, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import Context from './Context';

function Provider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  const history = useHistory();
  // useEffect(() => {
  //   const requestAPI = async () => {
  //     const response = await fetch('https://swapi.dev/api/planets');
  //     const { results } = await response.json();
  //     setData(results);
  //     // results: [{tatoonine}, {alderan}...] ---> array object;
  //   };
  //   requestAPI();
  // }, []);
  // const contextBase = { data };

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

  const contextState = useMemo(() => ({
    email,
    password,
    disabled,
    handleChangeEmail,
    handleChangePassword,
    handleDisabled,
    handleClick,
  }), [email,
    password,
    disabled,
    handleChangeEmail,
    handleChangePassword,
    handleDisabled,
    handleClick]);

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
