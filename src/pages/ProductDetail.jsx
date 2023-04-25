import React from 'react';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';
import Button from '../components/Button';
import { setItem } from '../services/localStorageFuncs';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      product: '',
      cart: [],
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;

    const result = await getProductById(id);

    this.setState({ product: result });
  }

  addProductCart = (product) => {
    console.log(product);
    const { cart } = this.state;

    this.setState({
      cart: [...cart, product],
    });

    setItem('products', [...cart, product]);
  };

  render() {
    const { product } = this.state;
    console.log(product);

    return (
      <div>
        <div key={ product.id }>
          <h3 data-testid="product-detail-name">{ product.title }</h3>
          <img data-testid="product-detail-image" src={ product.thumbnail } alt="" />
          <h4 data-testid="product-detail-price">{`R$ ${product.price} `}</h4>
          <p>{ product.content }</p>
        </div>

        <Button />

        <button
          data-testid="product-detail-add-to-cart"
          onClick={ () => this.addProductCart(product) }
        >
          Adicionar ao Carrinho
        </button>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ProductDetails;
