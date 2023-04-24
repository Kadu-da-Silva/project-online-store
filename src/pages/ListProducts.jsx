import React from 'react';
import { Link } from 'react-router-dom';
import * as api from '../services/api';
import Button from '../components/Button';

class ListProducts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      handleCategories: [],
      // selectedCategory: null,
      resultQuery: [],
      resultCategory: [],
      inputQuery: '',
    };
  }

  componentDidMount() {
    this.handleFetchCategory();
    // this.searchProducts();
  }

  handleFetchCategory = async () => {
    const categories = await api.getCategories();

    this.setState({ handleCategories: [...categories] });
  };

  handleSelectCategory = async ({ target }) => {
    const categoryId = target.value;
    console.log(categoryId);
    const result = await api.getProductsFromCategoryAndQuery(categoryId);
    this.setState({ resultCategory: result.results });
  };

  handleSearchBtn = async () => {
    const { inputQuery } = this.state;

    const result = await api.getProductsFromCategoryAndQuery('', inputQuery);
    this.setState({
      resultQuery: result.results,
      inputQuery: '',
    });
  };

  handleInputQuery = async ({ target }) => {
    const { value } = target;

    this.setState({ inputQuery: value });
  };

  render() {
    const {
      handleCategories,
      // selectedCategory,
      resultQuery,
      inputQuery,
      resultCategory,
    } = this.state;

    return (
      <div className="container">
        <div className="categories-container">
          {handleCategories.map((category) => (
            <div key={ category.id }>
              <label htmlFor={ category.id }>
                <input
                  data-testid="category"
                  id={ category.id }
                  name="category"
                  type="radio"
                  value={ category.id }
                  // checked={ resultCategory === category.id }
                  onChange={ this.handleSelectCategory }
                />
                {category.name}
              </label>
            </div>
          ))}
        </div>
        <div className="query-container">
          <input
            data-testid="query-input"
            id="input-query"
            className="input-query"
            name="input-query"
            type="text"
            placeholder="🔍 Digite o produto"
            value={ inputQuery }
            onChange={ this.handleInputQuery }
          />
          <button
            data-testid="query-button"
            onClick={ this.handleSearchBtn }
          >
            Pesquisar
          </button>
          <div>
            <h3
              data-testid="home-initial-message"
            >
              Digite algum termo de pesquisa ou escolha uma categoria.
            </h3>
            <Button />
          </div>
          {resultQuery.length > 0
            ? (
              <div>
                {resultQuery.map(({ id, title, thumbnail, price }) => (
                  <div key={ id } data-testid="product">

                    <img src={ thumbnail } alt={ title } />
                    <p>{ title }</p>
                    <p>{ price }</p>
                    <Link
                      data-testid="product-detail-link"
                      to={ `product/${id}` }
                    >
                      View Details
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <p>Nenhum produto foi encontrado</p>
            )}

          <div>
            {resultCategory.map(({ id, title, thumbnail, price }) => (
              <div key={ id } data-testid="product">
                <img src={ thumbnail } alt={ title } />
                <p>{ title }</p>
                <p>{ price }</p>
                <Link
                  data-testid="product-detail-link"
                  to={ `product/${id}` }

                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </div>

      </div>
    );
  }
}
// oi
// oi
export default ListProducts;
