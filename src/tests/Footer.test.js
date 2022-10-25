import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import Provider from '../context/Provider';
import Footer from '../components/Footer';

describe('Testa componente Footer', () => {
  it('', () => {
    renderWithRouter(
      <Provider>
        <Footer />
      </Provider>,
    );

    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
    const drinkBtn = screen.getByTestId('drinks-bottom-btn');
    expect(drinkBtn).toBeInTheDocument();
    const mealsBtn = screen.getByTestId('meals-bottom-btn');
    expect(mealsBtn).toBeInTheDocument();
    userEvent.click(mealsBtn);
    waitFor(() => expect(pathname).toBe('/meals'));
  });
});
