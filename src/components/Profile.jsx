import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

function Profile() {
  const history = useHistory();

  const handleEmail = () => {
    const getEmail = JSON.parse(localStorage.getItem('user'));
    const { email } = getEmail;
    return email;
  };

  const handleClickDoneRecipes = () => {
    history.push('/done-recipes');
  };

  const handleClickFavoriteRecipes = () => {
    history.push('/favorite-recipes');
  };

  const handleClickLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <Header />
      <h3
        data-testid="profile-email"
      >
        {`Email: ${handleEmail()}`}
      </h3>
      <button
        data-testid="profile-done-btn"
        type="button"
        onClick={ handleClickDoneRecipes }
      >
        Done Recipes
      </button>
      <button
        data-testid="profile-favorite-btn"
        type="button"
        onClick={ handleClickFavoriteRecipes }
      >
        Favorite Recipes
      </button>
      <button
        data-testid="profile-logout-btn"
        type="button"
        onClick={ handleClickLogout }
      >
        Logout
      </button>
      <Footer />
    </div>
  );
}

export default Profile;
