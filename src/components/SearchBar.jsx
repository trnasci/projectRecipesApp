import React, { useContext } from 'react';
import Context from '../context/Context';

function SearchBar() {
  const {
    setRadioInput,
    setSearchInput,
    searchInput,
    handleClickAPI,
  } = useContext(Context);

  const handleRadio = ({ target }) => {
    const { value } = target;
    setRadioInput(value);
  };

  const handleChange = ({ target }) => {
    const { value } = target;
    setSearchInput(value);
  };

  return (
    <div>
      <input
        data-testid="search-input"
        type="text"
        name="search-input"
        value={ searchInput }
        onChange={ handleChange }
      />
      <div>
        <label htmlFor="ingredient">
          <input
            type="radio"
            id="ingredient"
            name="search-filter"
            value="Ingredient"
            data-testid="ingredient-search-radio"
            onChange={ handleRadio }
          />
          Ingredient
        </label>
        <label htmlFor="name">
          <input
            type="radio"
            id="name"
            name="search-filter"
            value="Name"
            data-testid="name-search-radio"
            onChange={ handleRadio }
          />
          Name
        </label>
        <label htmlFor="first-letter">
          <input
            type="radio"
            id="first-letter"
            name="search-filter"
            value="First letter"
            data-testid="first-letter-search-radio"
            onChange={ handleRadio }
          />
          First letter
        </label>
      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleClickAPI }
      >
        Pesquisar
      </button>
    </div>
  );
}

export default SearchBar;
