import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import Provider from '../context/Provider';
import App from '../App';

describe('Testa componente Recipe Details', () => {
  it('Meals', async () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      ['/meals/53013'],
    );

    const { location: { pathname } } = history;

    const img = screen.getByTestId('recipe-photo');
    expect(img).toBeInTheDocument();

    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();

    expect(await screen.findByTestId('0-ingredient-name-and-measure', {}, { timeout: 5000 })).toBeInTheDocument();

    const instructionsText = screen.getByTestId('instructions');
    expect(instructionsText).toBeInTheDocument();

    const video = screen.getByTestId('video');
    expect(video).toBeInTheDocument();

    const favoriteButton = screen.getByRole('img', {
      name: /whiteheart/i,
    });
    userEvent.click(favoriteButton);

    const startButton = screen.getByTestId('start-recipe-btn');
    userEvent.click(startButton);

    waitFor(() => expect(pathname).toBe('/meals/53013/in-progress'));
  });

  it('Drinks', async () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      ['/drinks/17222'],
    );

    const { location: { pathname } } = history;

    const img = screen.getByTestId('recipe-photo');
    expect(img).toBeInTheDocument();

    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();

    expect(await screen.findByTestId('0-ingredient-name-and-measure', {}, { timeout: 5000 })).toBeInTheDocument();

    const instructionsText = screen.getByTestId('instructions');
    expect(instructionsText).toBeInTheDocument();

    const startButton = screen.getByTestId('start-recipe-btn');
    userEvent.click(startButton);

    waitFor(() => expect(pathname).toBe('/drinks/17222/in-progress'));
  });
});
