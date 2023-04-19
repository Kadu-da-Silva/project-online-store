import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import * as api from './services/api';
import Products from './pages/Products';

api.getCategories().then((categories) => { console.log(categories); });

api.getProductsFromCategoryAndQuery('carro').then((categories) => {
  console.log(categories);
});

api.getProductsFromCategoryAndQuery('MLB2203652659').then((categories) => {
  console.log(categories);
});

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Online Store</h1>
        <Switch>
          <Route exact path="/" component={ Products } />
        </Switch>
      </div>
    );
  }
}
export default App;
