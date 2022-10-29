import React from 'react';
import Footer from './Footer';
import Header from './Header';
import Recipes from './Recipes';
// import Recomendations from './Recomendations';

function Drinks() {
  return (
    <div>
      <Header />
      <Recipes />
      {/* <Recomendations /> */}
      <Footer />
    </div>
  );
}

export default Drinks;
