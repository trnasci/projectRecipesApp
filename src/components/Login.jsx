import React from 'react';
// import Context from '../context/Context';

function Login() {
  return (
    <form>
      <label htmlFor="email">
        Email:
        <input
          data-testid="email-input"
          type="email"
        />
      </label>
      <label htmlFor="password">
        Senha:
        <input
          data-testid="password-input"
          type="password"
        />
      </label>
      <button
        data-testid="login-submit-btn"
        type="button"
      >
        Enter
      </button>
    </form>
  );
}

export default Login;
