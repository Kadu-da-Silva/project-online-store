import React from 'react';

class Products extends React.Component {
  render() {
    return (
      <label
        data-testid="home-initial-message"
        htmlFor="product"
      >
        Digite algum termo de pesquisa ou escolha uma categoria.
        <input
          id="product"
          name="product"
          type="text"
          placeholder="Digite o produto"
        />
      </label>
    );
  }
}

export default Products;
