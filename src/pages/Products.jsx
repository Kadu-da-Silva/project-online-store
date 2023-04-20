import React from 'react';
import Button from '../components/Button';

class Products extends React.Component {
  render() {
    return (
      <div className="product-container">
        <input
          id="product"
          name="product"
          type="text"
          placeholder="🔍 Digite o produto"
        />
        <h3>Digite algum termo de pesquisa ou escolha uma categoria.</h3>
        <Button />
      </div>

    );
  }
}

export default Products;
