import React from 'react';

function SearchBar() {
  return (
    <div>
      <input
        data-testid="search-input"
        type="text"
        name=""
      />
      <div>
        <label htmlFor="ingredient">
          <input
            type="radio"
            id="ingredient"
            name="search-filter"
            value="Ingredient"
            data-testid="ingredient-search-radio"
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
          />
          First letter
        </label>
      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
      >
        Pesquisar
      </button>
    </div>
  );
}

export default SearchBar;
