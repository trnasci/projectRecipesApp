import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
// import App from '../App';
import Provider from '../context/Provider';
import Login from '../components/Login';

describe('Testando tela de Login', () => {
  // const inputEmail = screen.getByTestId('email-input');
  // const inputPassword = screen.getByTestId('password-input');
  // const submitButton = screen.getByTestId('login-submit-btn');
  it('Verifica se os inputs estão na tela', () => {
    renderWithRouter(
      <Provider>
        <Login />
      </Provider>,
    );

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveProperty('disabled', true);
  });
  it('Verifica se o botão está desabilitado', () => {
    renderWithRouter(
      <Provider>
        <Login />
      </Provider>,
    );

    userEvent.type(inputEmail, 'valeria-menezes');
    userEvent.type(inputPassword, '123');
    expect(submitButton).toBeDisabled();
  });
  it('Testa se o botão está habiltado', () => {
    renderWithRouter(
      <Provider>
        <Login />
      </Provider>,
    );
    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const submitButton = screen.getByTestId('login-submit-btn');

    userEvent.type(inputEmail, 'valeria@email');
    userEvent.type(inputPassword, '1234567');
    userEvent.click(submitButton);
  });
});
