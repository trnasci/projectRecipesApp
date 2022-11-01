import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import Provider from '../context/Provider';
import App from '../App';

const copy = require('clipboard-copy');

jest.mock('clipboard-copy');

describe('Testa tela RecipeInProgress', () => {
  it('Testa a renderização de meals in progress', async () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      ['/meals/52768/in-progress'],
    );
    const { location: { pathname } } = history;

    const recipeImage = screen.getByTestId('recipe-photo');
    expect(recipeImage).toBeInTheDocument();

    const recipeTitle = screen.getByTestId('recipe-title');
    expect(recipeTitle).toBeInTheDocument();

    const recipeCategory = screen.getByTestId('recipe-category');
    expect(recipeCategory).toBeInTheDocument();

    const recipeInstructions = screen.getByTestId('instructions');
    expect(recipeInstructions).toBeInTheDocument();

    copy.mockImplementation(() => {});

    const shareBtn = screen.getByTestId('share-btn');
    expect(shareBtn).toBeInTheDocument();
    userEvent.click(shareBtn);

    await screen.findByText(/link copied!/i);
    expect(copy).toHaveBeenCalled();
    // waitFor(() => expect(linkCopied).toBeInTheDocument());

    const checkboxes = await screen.findAllByRole('checkbox');
    expect(checkboxes).toHaveLength(9);
    checkboxes.forEach((el) => {
      userEvent.click(el);
    });

    const finishBtn = await screen.findByTestId('finish-recipe-btn');
    expect(finishBtn).not.toBeDisabled();
    userEvent.click(finishBtn);
    waitFor(() => expect(pathname).toBe('/done-recipes'));
  });
  it('Testa a renderização de drinks in progress', async () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      ['/drinks/13332/in-progress'],
    );
    window.localStorage.clear();

    const { location: { pathname } } = history;

    const recipeImage = screen.getByTestId('recipe-photo');
    expect(recipeImage).toBeInTheDocument();

    const recipeTitle = screen.getByTestId('recipe-title');
    expect(recipeTitle).toBeInTheDocument();

    const recipeCategory = screen.getByTestId('recipe-category');
    expect(recipeCategory).toBeInTheDocument();

    const recipeInstructions = screen.getByTestId('instructions');
    expect(recipeInstructions).toBeInTheDocument();

    copy.mockImplementation(() => {});

    const shareBtn = screen.getByTestId('share-btn');
    expect(shareBtn).toBeInTheDocument();
    userEvent.click(shareBtn);

    await screen.findByText(/link copied!/i);
    expect(copy).toHaveBeenCalled();
    // waitFor(() => expect(linkCopied).toBeInTheDocument());

    const checkboxes = await screen.findAllByRole('checkbox');
    expect(checkboxes).toHaveLength(3);
    checkboxes.forEach((el) => {
      userEvent.click(el);
    });

    const finishBtn = await screen.findByTestId('finish-recipe-btn');
    expect(finishBtn).not.toBeDisabled();
    userEvent.click(finishBtn);
    waitFor(() => expect(pathname).toBe('/done-recipes'));
  });
});
