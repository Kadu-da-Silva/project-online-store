import React from 'react';
import { Link } from 'react-router-dom';

class Button extends React.Component {
  render() {
    return (
      <button className="button-container">
        <Link
          data-testid="shopping-cart-button"
          to="Cart"
        >
          🛒 Carrinho
        </Link>

      </button>

    );
  }
}

export default Button;
