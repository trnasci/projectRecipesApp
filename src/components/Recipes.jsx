import { useEffect, useContext, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import Context from '../context/Context';
import Card from './Card';

function Recipes() {
  const [listCategory, setListCategory] = useState([]);
  const { fetchAPI, setRadioInput, setSearchInput } = useContext(Context);
  const location = useLocation();
  const { pathname } = location;
  const fetchAPIFilterCategory = useCallback(async () => {
    if (pathname === '/meals') {
      const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
      const request = await fetch(URL);
      const maxRender = 5;
      const { meals } = await request.json();
      setListCategory(meals.slice(0, maxRender));
    } else {
      const URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
      const request = await fetch(URL);
      const maxRender = 5;
      const { drinks } = await request.json();
      setListCategory(drinks.slice(0, maxRender));
    }
  }, [pathname, setListCategory]);

  useEffect(() => {
    fetchAPI();
    fetchAPIFilterCategory();
  }, [fetchAPI, fetchAPIFilterCategory]);

  const handleCategory = ({ target }) => {
    const { name } = target;
    setSearchInput(name);
    setRadioInput('Category');
  };

  const handleClearFilter = () => {
    setSearchInput('');
    setRadioInput('');
  };
  console.log(listCategory);
  return (
    <section>
      {listCategory.map((element, index) => (
        <button
          name={ element.strCategory }
          type="button"
          key={ index }
          data-testid={ `${element.strCategory}-category-filter` }
          onClick={ handleCategory }
        >
          {element.strCategory}
        </button>
      ))}
      <button
        data-testid="All-category-filter"
        onClick={ handleClearFilter }
        type="button"
      >
        All
      </button>
      <Card />
    </section>
  );
}

export default Recipes;
