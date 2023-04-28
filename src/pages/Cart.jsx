import React from 'react';
import { Link } from 'react-router-dom';
import { setItem, getItem } from '../services/localStorageFuncs';

class Cart extends React.Component {
  state = {
    products: getItem('products') || [],
  };

  componentDidMount() {
    const newProduct = this.productCounter();
    this.setState({
      products: newProduct,
    });
  }

  // teste
  productCounter = () => {
    const products = getItem('products') || [];
    const repeatedIds = {};

    products.forEach((e) => {
      if (repeatedIds[e.id]) {
        repeatedIds[e.id] += 1;
      } else {
        repeatedIds[e.id] = 1;
      }
    });
    products.forEach((e) => {
      e.quantity = repeatedIds[e.id];
    });

    setItem('products', products);
    this.setState({
      products,
    });
    return products;
  };

  handleIncreaseButton = (productId) => {
    this.setState((prevState) => {
      const products = [...prevState.products];
      const filterProducts = products.filter(({ id }) => id === productId);
      filterProducts[0].quantity += 1;
      const newProducts = [filterProducts[0], ...products];
      return { products: newProducts };
    }, () => {
      const { products } = this.state;
      setItem('products', products);
    });
  };

  handleDecreaseButton = (productId) => {
    this.setState((prevState) => {
      const products = [...prevState.products];
      const filteredProducts = products.filter(({ id }) => id === productId);
      filteredProducts[0].quantity -= 1;
      const newProducts = products.filter(({ id }) => id !== productId);
      if (filteredProducts[0].quantity > 0) {
        const ultimoIndice = -1;
        const filteredProductsExceptLast = filteredProducts.slice(0, ultimoIndice);
        newProducts.push(...filteredProductsExceptLast);
      }
      return { products: newProducts };
    }, () => {
      const { products } = this.state;
      setItem('products', products);
    });
  };

  handleRemoveButton = (productId) => {
    this.setState((prevState) => {
      const products = [...prevState.products];
      const filteredProducts = products.filter(({ id }) => id !== productId);
      return { products: filteredProducts };
    }, () => {
      const { products } = this.state;
      setItem('products', products);
    });
  };

  uniqueProduct = () => {
    const { products } = this.state;
    const uniqueProducts = [];
    const displayedIds = [];
    products.forEach((element) => {
      if (!displayedIds.includes(element.id)) {
        uniqueProducts.push(element);
        displayedIds.push(element.id);
      }
    });
    return uniqueProducts;
  };

  render() {
    const uniqueProducts = this.uniqueProduct();

    return (
      <div data-testid="shopping-cart-empty-message">
        <button><Link to="/">Voltar</Link></button>
        {uniqueProducts.length > 0
          ? (
            <div>
              {uniqueProducts.map((element, index) => (
                <div key={ index }>
                  <h4 data-testid="shopping-cart-product-name">{ element.title }</h4>
                  <img src={ element.thumbnail } alt={ element.title } />
                  <p>{ element.price }</p>
                  <button
                    data-testid="product-decrease-quantity"
                    onClick={ () => this.handleDecreaseButton(element.id) }
                  >
                    -
                  </button>
                  <p data-testid="shopping-cart-product-quantity">
                    { String(element.quantity) }
                  </p>
                  <button
                    data-testid="product-increase-quantity"
                    onClick={ () => this.handleIncreaseButton(element.id) }
                  >
                    +
                  </button>
                  <button
                    data-testid="remove-product"
                    onClick={ () => this.handleRemoveButton(element.id) }
                  >
                    Excluir

                  </button>
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
