import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Products from './pages/ListProducts';
import Cart from './pages/Cart';
import ProductDetails from './pages/ProductDetail';

class App extends React.Component {
  render() {
    return (
      <main>
        <header>
          <h1>Online Store</h1>
        </header>
        <Switch>
          <Route exact path="/" component={ Products } />
          <Route path="/product/:id" component={ ProductDetails } />
          <Route exact path="/Cart" component={ Cart } />
        </Switch>
      </main>
    );
  }
}
export default App;
