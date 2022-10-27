import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import Provider from '../context/Provider';
import App from '../App';

const SEARCH_BTN = 'search-top-btn';
const ALL_CATEGORY = 'All-category-filter';

describe('Testa componente Recipes', () => {
  it('Testa se os botões de filtro existem na rota /meals', async () => {
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      ['/meals'],
    );
    const searchButton = await screen.findByTestId(SEARCH_BTN);
    await waitFor(() => expect(searchButton).toBeDefined());
    userEvent.click(searchButton);
    const beefButton = await screen.findByTestId('Beef-category-filter');
    const breakfastButton = await screen.findByTestId('Breakfast-category-filter');
    const chickenButton = await screen.findByTestId('Chicken-category-filter');
    const dessertButton = await screen.findByTestId('Dessert-category-filter');
    const goatButton = await screen.findByTestId('Goat-category-filter');
    const allButton = await screen.findByTestId(ALL_CATEGORY);
    expect(beefButton).toBeInTheDocument();
    expect(breakfastButton).toBeInTheDocument();
    expect(chickenButton).toBeInTheDocument();
    expect(dessertButton).toBeInTheDocument();
    expect(goatButton).toBeInTheDocument();
    expect(allButton).toBeInTheDocument();
  });

  it('Testa se os botões de filtro existem na rota /meals', async () => {
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      ['/drinks'],
    );
    const searchButton = await screen.findByTestId(SEARCH_BTN);
    await waitFor(() => expect(searchButton).toBeDefined());
    userEvent.click(searchButton);
    const OrdinaryDrinkButton = await screen.findByTestId('Ordinary Drink-category-filter');
    const CocktailButton = await screen.findByTestId('Cocktail-category-filter');
    const ShakeButton = await screen.findByTestId('Shake-category-filter');
    const OtherButton = await screen.findByTestId('Other/Unknown-category-filter');
    const CocoaButton = await screen.findByTestId('Cocoa-category-filter');
    const allButton = await screen.findByTestId(ALL_CATEGORY);
    expect(OrdinaryDrinkButton).toBeInTheDocument();
    expect(CocktailButton).toBeInTheDocument();
    expect(ShakeButton).toBeInTheDocument();
    expect(OtherButton).toBeInTheDocument();
    expect(CocoaButton).toBeInTheDocument();
    expect(allButton).toBeInTheDocument();
  });

  it('Testa se os filtros funcionam /drinks', async () => {
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      ['/drinks'],
    );
    const searchButton = await screen.findByTestId(SEARCH_BTN);
    await waitFor(() => expect(searchButton).toBeDefined());
    userEvent.click(searchButton);
    const OrdinaryDrinkButton = await screen.findByTestId('Ordinary Drink-category-filter');
    userEvent.click(OrdinaryDrinkButton);
    const drinkOrdinary = await screen.findByTestId('0-recipe-card');
    expect(drinkOrdinary).toBeInTheDocument();
    const allButton = await screen.findByTestId(ALL_CATEGORY);
    userEvent.click(allButton);
    const drinkGG = await screen.getByRole('heading', { name: /gg/i });
    expect(drinkGG).toBeInTheDocument();
  });

  it('Testa se os filtros funcionam na rota /meals', async () => {
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      ['/meals'],
    );
    const searchButton = await screen.findByTestId(SEARCH_BTN);
    await waitFor(() => expect(searchButton).toBeDefined());
    userEvent.click(searchButton);
    const beefButton = await screen.findByTestId('Beef-category-filter');
    expect(beefButton).toBeInTheDocument();
    userEvent.click(beefButton);
    const mealsBeef = await screen.findByTestId('0-recipe-card');
    expect(mealsBeef).toBeInTheDocument();
    userEvent.click(beefButton);
    const mealsCorba = await screen.getByRole('heading', { name: /corba/i });
    expect(mealsCorba).toBeInTheDocument();
  });
});
