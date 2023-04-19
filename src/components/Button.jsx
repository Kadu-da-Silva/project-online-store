import React from 'react';
import { Link } from 'react-router-dom';

class Button extends React.Component {
  render() {
    return (
      <button>
        <Link
          data-testid="shopping-cart-button"
          to="Cart"
        >
          Carrinho de Compras
        </Link>

      </button>

    );
  }
}

export default Button;
