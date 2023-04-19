import React from 'react';
import './App.css';
import * as api from './services/api';

api.getCategories().then((categories) => { console.log(categories); });

api.getProductsFromCategoryAndQuery('carro').then((categories) => {
  console.log(categories);
});

api.getProductsFromCategoryAndQuery('MLB2203652659').then((categories) => {
  console.log(categories);
});

function App() {
  return (
    <div className="App" />
  );
}

export default App;
