function LocalStorageDoneRecipes(id, pathname, detailsRecipe, history) {
  const doneRecipeStorage = JSON.parse(localStorage.getItem('doneRecipes'));
  const doneRecipesPath = '/done-recipes';
  const objDoneRecipe = [{
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
    doneDate: new Date(),
    tags: detailsRecipe.strTags ? detailsRecipe.strTags.split(',') : [],
  }];

  if (doneRecipeStorage) {
    if (doneRecipeStorage.some((e) => e.id === id)) {
      const filterDone = doneRecipeStorage.filter((i) => i.id !== id);
      localStorage.setItem('doneRecipes', JSON.stringify(filterDone));
      // return setFavorite(!favorite);
      return history.push(doneRecipesPath);
    }
    const allDone = [...doneRecipeStorage, ...objDoneRecipe];
    localStorage.setItem('doneRecipes', JSON.stringify(allDone));
    // return setFavorite(!favorite);
    return history.push(doneRecipesPath);
  }
  localStorage.setItem('doneRecipes', JSON.stringify(objDoneRecipe));
  // return setFavorite(!favorite);
  return history.push(doneRecipesPath);
}

export default LocalStorageDoneRecipes;
