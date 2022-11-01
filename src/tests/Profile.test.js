import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import Provider from '../context/Provider';
import App from '../App';
import Profile from '../components/Profile';

describe('Testa componente Profile', () => {
  // const email = screen.getByTestId('profile-email');
  // const doneRecipesBtn = screen.getByTestId('profile-done-btn');
  // const favoriteRecipesBtn = screen.getByTestId('profile-favorite-btn');
  // const logoutBtn = screen.getByTestId('profile-logout-btn');
  // it('Testa elementos do componente Profile', async () => {
  //   const { history } = renderWithRouter(
  //     <Provider>
  //       <App />
  //     </Provider>,
  //     ['/profile'],
  //   );

  //   const email = screen.getByTestId('profile-email');
  //   const doneRecipesBtn = screen.getByTestId('profile-done-btn');
  //   const favoriteRecipesBtn = screen.getByTestId('profile-favorite-btn');
  //   const logoutBtn = screen.getByTestId('profile-logout-btn');

  //   const { location: { pathname } } = history;
  //   waitFor(() => expect(pathname).toBe('/profile'));

  //   waitFor(() => expect(email).toBeInTheDocument());
  //   waitFor(() => expect(doneRecipesBtn).toBeInTheDocument());
  //   waitFor(() => expect(favoriteRecipesBtn).toBeInTheDocument());
  // });
  it('Testa funcionalidade do botão Done Recipes', () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      ['/profile'],
    );
    const { location: { pathname } } = history;

    const doneRecipesBtn = screen.getByTestId('profile-done-btn');
    waitFor(() => expect(doneRecipesBtn).toBeInTheDocument());
    userEvent.click(doneRecipesBtn);
    waitFor(() => expect(pathname).toBe('/done-recipes'));
  });
  it('Testa funcionalidade do botão Favorite Recipes', () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      ['/profile'],
    );
    const { location: { pathname } } = history;

    const favoriteRecipesBtn = screen.getByTestId('profile-favorite-btn');

    expect(favoriteRecipesBtn).toBeInTheDocument();
    userEvent.click(favoriteRecipesBtn);
    waitFor(() => expect(pathname).toBe('/favorite-recipes'));
  });
  it('Testa funcionalidade do botão Logout', () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      ['/profile'],
    );
    const { location: { pathname } } = history;

    const logoutBtn = screen.getByTestId('profile-logout-btn');

    expect(logoutBtn).toBeInTheDocument();
    userEvent.click(logoutBtn);
    waitFor(() => expect(pathname).toBe('/'));
  });
  it('Testa funcionamento do LocalStorage', () => {
    localStorage.setItem('user', JSON.stringify({ email: 'email@test.com' }));
    renderWithRouter(
      <Provider>
        <Profile />
      </Provider>,
    );
    const mensagem = screen.getByText('email@test.com');
    expect(mensagem).toBeInTheDocument();
  });
});
