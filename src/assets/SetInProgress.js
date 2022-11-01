function SetInProgress({ target }, pathname, id, ingredient) {
  target.parentNode.classList.toggle('checked');
  const rota = pathname.includes('meals') ? 'meals' : 'drinks';
  let inProgress = JSON.parse(localStorage
    .getItem('inProgressRecipes'));
  if (!inProgress) {
    if (rota === 'meals') {
      inProgress = { meals: { [id]: [] }, drinks: {} };
    } else {
      inProgress = { meals: {}, drinks: { [id]: [] } };
    }
  }
  if (pathname === `/meals/${id}/in-progress`) {
    if (inProgress.meals[id]?.some((el) => el === ingredient)) {
      const filterProgress = inProgress.meals[id].filter((it) => it !== ingredient);
      inProgress.meals[id] = filterProgress;
      return localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
    }
    inProgress.meals[id] = [...inProgress.meals[id], ingredient];
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
  }

  if (pathname === `/drinks/${id}/in-progress`) {
    if (inProgress.drinks[id].some((el) => el === ingredient)) {
      const filterProgress = inProgress.drinks[id].filter((it) => it !== ingredient);
      inProgress.drinks[id] = filterProgress;
      return localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
    }
    inProgress.drinks[id] = [...inProgress.drinks[id], ingredient];
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
  }
}

export default SetInProgress;
