import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import Provider from '../context/Provider';
// import Header from '../components/Header';
import Meals from '../components/Meals';

describe('Testa componente Header', () => {
  it('', () => {
    const { history } = renderWithRouter(
      <Provider>
        <Meals />
      </Provider>,
    );

    const { location: { pathname } } = history;
    waitFor(() => expect(pathname).toBe('/meals'));

    const profileIcon = screen.getByTestId('profile-top-btn');
    // const searchIcon = screen.getByTestId('search-top-btn');
    const pageTitle = screen.getByTestId('page-title');

    expect(profileIcon).toBeInTheDocument();
    // expect(searchIcon).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();

    userEvent.click(profileIcon);
    waitFor(() => expect(pathname).toBe('/profile'));
  });
});
