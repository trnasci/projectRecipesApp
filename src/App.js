import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Meals from './components/Meals';
import MealsID from './components/MealsID';
import MealsProgress from './components/MealsProgress';
import Drinks from './components/Drinks';
import DrinksID from './components/DrinksID';
import DrinksProgress from './components/DrinksProgress';
import Profile from './components/Profile';
import DoneRecipes from './components/DoneRecipes';
import Favorites from './components/Favorites';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/meals" component={ Meals } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route path="/meals/:id-da-receita" component={ MealsID } />
      <Route path="/drinks/:id-da-receita" component={ DrinksID } />
      <Route path="/meals/:id-da-receita/in-progress" component={ MealsProgress } />
      <Route path="/drinks/:id-da-receita/in-progress" component={ DrinksProgress } />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ Favorites } />
    </Switch>
  );
}

export default App;
