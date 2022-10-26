import React from 'react';
import Footer from './Footer';
import Header from './Header';

function Profile() {
  return (
    <div>
      <Header />
      <form>
        <label htmlFor="email">
          Email:
          <input
            data-testid="profile-email"
          />
        </label>
        <button
          data-testid="profile-done-btn"
          type="button"
        >
          Done Recipes
        </button>
        <button
          data-testid="profile-favorite-btn"
          type="button"
        >
          Favorite Recipes
        </button>
        <button
          data-testid="profile-logout-btn"
          type="button"
        >
          Logout
        </button>
      </form>
      <Footer />
    </div>
  );
}

export default Profile;
