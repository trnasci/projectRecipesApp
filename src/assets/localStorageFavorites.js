function localStorageFavorite({ obj }) {
  console.log(obj);
  const { id, pathname, favorite, setFavorite, detailsRecipe } = obj;
  const favoriteStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const objFavorite = [{
    id,
    type: pathname === `/meals/${id}` || pathname === `/meals/${id}/in-progress`
      ? 'meal' : 'drink',
    nationality: pathname === `/meals/${id}` || pathname === `/meals/${id}/in-progress`
      ? detailsRecipe.strArea : '',
    category: detailsRecipe.strCategory,
    alcoholicOrNot: pathname === `/drinks/${id}`
    || pathname === `/drinks/${id}/in-progress`
      ? detailsRecipe.strAlcoholic : '',
    name: pathname === `/meals/${id}` || pathname === `/meals/${id}/in-progress`
      ? detailsRecipe.strMeal : detailsRecipe.strDrink,
    image: pathname === `/meals/${id}` || pathname === `/meals/${id}/in-progress`
      ? detailsRecipe.strMealThumb : detailsRecipe.strDrinkThumb,
  }];

  if (favoriteStorage) {
    if (favoriteStorage.some((e) => e.id === id)) {
      const filterFavorite = favoriteStorage.filter((i) => i.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(filterFavorite));
      return setFavorite(!favorite);
    }
    const allFavorite = [...favoriteStorage, ...objFavorite];
    localStorage.setItem('favoriteRecipes', JSON.stringify(allFavorite));
    return setFavorite(!favorite);
  }
  localStorage.setItem('favoriteRecipes', JSON.stringify(objFavorite));
  return setFavorite(!favorite);
}

export default localStorageFavorite;
