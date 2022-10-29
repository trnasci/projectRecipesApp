import React, { useContext } from 'react';
import shareIcon from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import Context from '../context/Context';
import localStorageFavorite from '../assets/localStorageFavorites';

const copy = require('clipboard-copy');

function Buttons(obj) {
  const { copyBtn, setCopyBtn, favorite } = useContext(Context);
  return (
    <div className="start-recipe-btn">
      <button
        data-testid="share-btn"
        type="button"
        onClick={ () => {
          copy(window.location.href.replace('/in-progress', ''));
          setCopyBtn(!copyBtn);
        } }
      >
        <img
          src={ shareIcon }
          alt="icon"
        />
      </button>
      <button
        data-testid="favorite-btn"
        type="button"
        src={ favorite ? blackHeart : whiteHeart }
        onClick={ () => {
          localStorageFavorite(obj);
        } }
      >
        { favorite
          ? (
            <img
              src={ blackHeart }
              alt="blackHeart"
            />)
          : (
            <img
              src={ whiteHeart }
              alt="whiteHeart"
            />
          )}
      </button>
    </div>
  );
}

export default Buttons;
