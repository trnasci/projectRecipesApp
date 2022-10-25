import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import Provider from '../context/Provider';
// import Header from '../components/Header';
// import Meals from '../components/Meals';
import App from '../App';

describe('Testa componente Header', () => {
  it('Testa os ícones e links ', () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      ['/meals'],
    );

    const { location: { pathname } } = history;
    waitFor(() => expect(pathname).toBe('/meals'));

    const profileIcon = screen.getByTestId('profile-top-btn');
    const searchIcon = screen.getByTestId('search-top-btn');
    const pageTitle = screen.getByTestId('page-title');

    expect(profileIcon).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();

    userEvent.click(profileIcon);
    waitFor(() => expect(pathname).toBe('/profile'));
  });

  it('Testa o search', async () => {
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      ['/meals'],
    );
    const searchButton = await screen.findByTestId('search-top-btn');
    await waitFor(() => expect(searchButton).toBeDefined());
    userEvent.click(searchButton);
    const inputSearch = screen.getByTestId('search-input');
    expect(inputSearch).toBeInTheDocument();
    userEvent.type(inputSearch, 'manga');
  });

  it('Testa o search', async () => {
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      ['/done-recipes'],
    );
    const title = screen.getByTestId('page-title');

    // expect(title).toBe(/Done Recipes/i);
    expect(title).toBeInTheDocument();
  });
});
