import React, { useContext } from 'react';
import Context from '../context/Context';

function Login() {
  const {
    email,
    password,
    disabled,
    handleChangeEmail,
    handleChangePassword,
    handleClick,
  } = useContext(Context);
  return (
    <form>
      <label htmlFor="email">
        Email:
        <input
          data-testid="email-input"
          type="email"
          name="email"
          value={ email }
          onChange={ handleChangeEmail }
        />
      </label>
      <label htmlFor="password">
        Senha:
        <input
          data-testid="password-input"
          type="password"
          name="password"
          value={ password }
          onChange={ handleChangePassword }
        />
      </label>
      <button
        data-testid="login-submit-btn"
        type="button"
        disabled={ disabled }
        onClick={ handleClick }
      >
        Enter
      </button>
    </form>
  );
}
export default Login;
