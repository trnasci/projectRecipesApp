import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import Provider from '../context/Provider';
import App from '../App';

describe('Testa SearchBar', () => {
  it('Testa Pesquisa', async () => {
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      ['/meals'],
    );
    const searchBarButton = screen.getByTestId('search-top-btn');
    expect(searchBarButton).toBeInTheDocument();
    userEvent.click(searchBarButton);

    const radioButton = screen.getByText(/ingredient/i);
    expect(radioButton).toBeInTheDocument();
    userEvent.click(radioButton);

    const inputSearch = screen.getByTestId('search-input');
    expect(inputSearch).toBeInTheDocument();
    userEvent.type(inputSearch, 'banana');

    const searchButton = screen.getByTestId('exec-search-btn');
    expect(searchButton).toBeInTheDocument();
    userEvent.click(searchButton);

    expect(await screen.findByTestId('0-card-name', {}, { timeout: 5000 })).toBeInTheDocument();
  });
});
