import PropTypes from 'prop-types';
import { useState, useMemo } from 'react';
import Context from './Context';

function Provider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
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

  const handleDisabled = () => {
    const validationEmail = /\S+@\S+\.\S+/;
    const emailInput = validationEmail.test(email);
    const CHARACTER_LIMIT = 6;
    const passwordInput = password.length >= CHARACTER_LIMIT;
    const totalValidation = emailInput && passwordInput;
    if (totalValidation) {
      setDisabled(false);
    }
  };

  const handleChangeEmail = ({ target }) => {
    const { value } = target;
    setEmail(value);
    handleDisabled();
  };

  const handleChangePassword = ({ target }) => {
    const { value } = target;
    setPassword(value);
    handleDisabled();
  };

  const handleClick = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
  };

  const contextState = useMemo(() => ({
    email,
    password,
    disabled,
    handleChangeEmail,
    handleChangePassword,
    handleDisabled,
    handleClick,
  }), [email, disabled, password]);

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
