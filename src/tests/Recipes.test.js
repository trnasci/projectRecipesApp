import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import Provider from '../context/Provider';
// import Header from '../components/Header';
// import Meals from '../components/Meals';
import App from '../App';

describe('Testa componente Recipes', () => {
  it('Testa se os botões de filtro existem na rota /meals', async () => {
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      ['/meals'],
    );
    const searchButton = await screen.findByTestId('search-top-btn');
    await waitFor(() => expect(searchButton).toBeDefined());
    userEvent.click(searchButton);
    const beefButton = await screen.findByTestId('Beef-category-filter');
    const breakfastButton = await screen.findByTestId('Breakfast-category-filter');
    const ChickenButton = await screen.findByTestId('Chicken-category-filter');
    const DessertButton = await screen.findByTestId('Dessert-category-filter');
    const goatButton = await screen.findByTestId('Goat-category-filter');
    expect(beefButton).toBeInTheDocument();
    expect(breakfastButton).toBeInTheDocument();
    expect(ChickenButton).toBeInTheDocument();
    expect(DessertButton).toBeInTheDocument();
    expect(goatButton).toBeInTheDocument();
  });

  it('Testa se os botões de filtro existem na rota /drinks', async () => {
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      ['/drinks'],
    );
    const searchButton = await screen.findByTestId('search-top-btn');
    await waitFor(() => expect(searchButton).toBeDefined());
    userEvent.click(searchButton);
    const OrdinaryDrinkButton = await screen.findByTestId('Ordinary Drink-category-filter');
    const CocktailButton = await screen.findByTestId('Cocktail-category-filter');
    const ShakeButton = await screen.findByTestId('Shake-category-filter');
    const OtherButton = await screen.findByTestId('Other/Unknown-category-filter');
    const CocoaButton = await screen.findByTestId('Cocoa-category-filter');
    expect(OrdinaryDrinkButton).toBeInTheDocument();
    expect(CocktailButton).toBeInTheDocument();
    expect(ShakeButton).toBeInTheDocument();
    expect(OtherButton).toBeInTheDocument();
    expect(CocoaButton).toBeInTheDocument();
  });
});
