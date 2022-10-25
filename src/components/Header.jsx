import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header() {
  const [searchInput, setSearchInput] = useState(false);
  const location = useLocation();
  const { pathname } = location;

  let haveSearchIcon = false;
  if (pathname === '/drinks' || pathname === '/meals') {
    haveSearchIcon = true;
  }
  let title;
  if (pathname === '/done-recipes' || pathname === '/favorite-recipes') {
    const str = pathname.substring(1, pathname.length);
    const str2 = str.replace('-', ' ');
    const arr = str2.split(' ');
    const fristChar = arr[0].charAt(0).toUpperCase();
    const secondChar = arr[1].charAt(0).toUpperCase();
    const str3 = arr[0].slice(1);
    const str4 = arr[1].slice(1);
    title = `${fristChar}${str3} ${secondChar}${str4}`;
  } else {
    const str = pathname.substring(1, pathname.length);
    const fristChar = str.charAt(0).toUpperCase();
    const str2 = str.slice(1);
    title = fristChar + str2;
  }

  /*  const handleSearch({ target }) => {

  } */
  return (
    <div>
      <Link to="/profile">
        <img
          alt="profile icon"
          src={ profileIcon }
          data-testid="profile-top-btn"
        />
      </Link>
      {
        haveSearchIcon && (
          <button
            type="button"
            onClick={ () => { setSearchInput(!searchInput); } }
          >
            <img
              alt="search icon"
              src={ searchIcon }
              data-testid="search-top-btn"
            />
          </button>
        )
      }
      {
        searchInput && (
          <SearchBar />
        )
      }
      <h1 data-testid="page-title">{title}</h1>
    </div>
  );
}

export default Header;
