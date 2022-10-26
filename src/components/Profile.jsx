import React from 'react';
// import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

function Profile() {
  const getEmail = JSON.parse(localStorage.getItem('user'));

  const handleClickLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('doneRecipes');
    localStorage.removeItem('favoriteRecipes');
    localStorage.removeItem('inProgressRecipes');
  };

  return (
    <div>
      <Header />
      <h3
        data-testid="profile-email"
      >
        {
          getEmail ? getEmail.email : 'Email não encontado'
        }
      </h3>
      <Link to="/done-recipes">
        <button type="button" data-testid="profile-done-btn">
          Done Recipes
        </button>
      </Link>

      <Link to="/favorite-recipes">
        <button type="button" data-testid="profile-favorite-btn">
          Favorite Recipes
        </button>
      </Link>

      <Link to="/">
        <button
          data-testid="profile-logout-btn"
          type="button"
          onClick={ handleClickLogout }
        >
          Logout
        </button>
      </Link>

      <Footer />
    </div>
  );
}

export default Profile;
