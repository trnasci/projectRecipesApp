import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Meals from './components/Meals';
import MealsID from './components/MealsID';
// import MealsProgress from './components/MealsProgress';
import Drinks from './components/Drinks';
import DrinksID from './components/DrinksID';
// import DrinksProgress from './components/DrinksProgress';
import Profile from './components/Profile';
import DoneRecipes from './components/DoneRecipes';
import Favorites from './components/Favorites';
import RecipeInProgress from './components/RecipeInProgress';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/meals" component={ Meals } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route exact path="/meals/:id/in-progress" component={ RecipeInProgress } />
      <Route exact path="/drinks/:id/in-progress" component={ RecipeInProgress } />
      <Route path="/meals/:id" component={ MealsID } />
      <Route path="/drinks/:id" component={ DrinksID } />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ Favorites } />
    </Switch>
  );
}

export default App;
