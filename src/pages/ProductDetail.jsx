import React from 'react';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';

class ProductDetail extends React.Component {
  state = {
    productContent: [],
  };

  componentDidMount() {
    this.fetchProduct();
  }

  fetchProduct = async () => {
    const { match: { params: { id } } } = this.props;

    const products = await getProductById(id);
    this.setState({
      productContent: products,
    });
  };

  render() {
    const { productContent } = this.state;
    const { history } = this.props;
    console.log(productContent);
    return (
      <div>
        <h2 data-testid="product-detail-name">{productContent.title}</h2>
        <img
          data-testid="product-detail-image"
          src={ productContent.thumbnail }
          alt={ productContent.title }
        />
        <p data-testid="product-detail-price">{productContent.price}</p>
        <p>{productContent.condition}</p>
        <button
          data-testid="shopping-cart-button"
          onClick={ () => history.push('/cart') }
        >
          Carrinho
        </button>
      </div>
    );
  }
}

ProductDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      search: PropTypes.string.isRequired,
      hash: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ProductDetail;
