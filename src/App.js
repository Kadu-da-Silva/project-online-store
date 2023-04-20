import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Products from './pages/ListProducts';
import Cart from './pages/Cart';

class App extends React.Component {
  render() {
    return (
      <main>
        <header>
          <h1>Online Store</h1>
        </header>
        <Switch>
          <Route exact path="/" component={ Products } />
          <Route exact path="/cart" component={ Cart } />
        </Switch>
      </main>
    );
  }
}
export default App;
