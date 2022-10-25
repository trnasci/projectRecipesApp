import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './Footer.css';

function Footer() {
  return (
    <footer data-testid="footer">
      <Link to="/drinks">
        <button type="button">
          <img
            alt="drinks-bottom"
            src={ drinkIcon }
            data-testid="drinks-bottom-btn"
          />
        </button>
      </Link>
      <Link to="/meals">
        <button type="button">
          <img
            alt="drinks-bottom"
            src={ mealIcon }
            data-testid="meals-bottom-btn"
          />
        </button>
      </Link>
    </footer>
  );
}

export default Footer;
