import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import Provider from '../context/Provider';
import App from '../App';
// import Profile from '../components/Profile';

describe('Testa componente Profile', () => {
  it('Testa elementos do componente Profile', async () => {
    // const { history } =
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      ['/profile'],
    );
    // const { location: { pathname } } = history;
    // waitFor(() => expect(pathname).toBe('/profile'));

    // const email = screen.getByRole('heading', {
    //   name: /email: valeriamenezes022@gmail\.com/i,
    // });

    const email = screen.getByTestId('profile-email');
    // const doneRecipesBtn = screen.getByTestId('profile-done-btn');
    // const favoriteRecipesBtn = screen.getByTestId('profile-favorite-btn');

    expect(email).toBeInTheDocument();
    // expect(doneRecipesBtn).toBeInTheDocument();
    // expect(favoriteRecipesBtn).toBeInTheDocument();
  });
});
