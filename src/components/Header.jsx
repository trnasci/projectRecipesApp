import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {
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

  return (
    <div>
      <Link to="/profile">
        <img
          alt="profile icon"
          src="src/images/profileIcon.svg"
          data-testid="profile-top-btn"
        />
      </Link>
      {
        haveSearchIcon && (
          <img
            alt="search icon"
            src="/src/images/searchIcon.svg"
            data-testid="search-top-btn"
          />
        )
      }
      <h1 data-testid="page-title">{title}</h1>
    </div>
  );
}

export default Header;
