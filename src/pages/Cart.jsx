import React from 'react';
import { getItem } from '../services/localStorageFuncs';

class Cart extends React.Component {
  state = {
    products: getItem('products') || '',
    counter: 1,
  };

  render() {
    const { products, counter } = this.state;
    console.log(products);
    return (
      <div data-testid="shopping-cart-empty-message">
        {products.length > 0
          ? (
            <div>
              {products.map((element) => (
                <div key={ element.id }>
                  <h2 data-testid="shopping-cart-product-name">{ element.title }</h2>
                  <img src={ element.thumbnail } alt={ element.title } />
                  <p data-testid="shopping-cart-product-quantity">{counter}</p>
                  <p>{ element.price }</p>
                </div>
              ))}
            </div>
          ) : (
            <p>Seu carrinho está vazio</p>
          )}
      </div>

    );
  }
}

export default Cart;
