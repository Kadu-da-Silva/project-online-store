import React from 'react';
import { Link } from 'react-router-dom';
import * as api from '../services/api';
import Button from '../components/Button';

// api.getProductsFromCategoryAndQuery('MLB1430', '').then((categories) => { console.log(categories); });

class ListProducts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      handleCategories: [],
      inputQuery: '',
      resultSearch: [],
      isSearchCompleted: false,
    };
  }

  componentDidMount() {
    this.handleFetchCategory();
    // this.searchProducts();
  }

  handleFetchCategory = async () => {
    const categories = await api.getCategories();
    // console.log(categories);

    this.setState({ handleCategories: [...categories] });
  };

  handleChangeQuery = ({ target }) => {
    const { value } = target;

    this.setState({
      inputQuery: value,
    });
  };

  handleChangeCategory = async ({ target }) => {
    const { value } = target;

    const result = await api.getProductsFromCategoryAndQuery(value, '');
    this.setState({ resultSearch: result.results });
  };

  searchProducts = async () => {
    const { inputQuery } = this.state;
    const result = await api.getProductsFromCategoryAndQuery('', inputQuery);
    console.log(result);

    this.setState({
      resultSearch: result.results,
      isSearchCompleted: true,
      // inputQuery: '',
      // inputRadio: '',
    });
  };

  render() {
    const {
      handleCategories,
      inputQuery,
      resultSearch,
      isSearchCompleted,
    } = this.state;

    // console.log(resultSearch);

    return (
      <div className="container">

        {/* //! Lista de categorias */}
        <div className="categories-container">
          {handleCategories.map((category) => (
            <div key={ category.id }>
              <label htmlFor={ category.id }>
                <input
                  data-testid="category"
                  id={ category.id }
                  name="inputRadio"
                  type="radio"
                  value={ category.id }
                  onChange={ this.handleChangeCategory }
                  // onClick={ this.searchProducts }
                />
                {category.name}
              </label>
            </div>
          ))}
        </div>

        {/* //! Campo de busca e btn Pesquisar */}
        <div className="query-container">
          <input
            data-testid="query-input"
            id="input-query"
            className="input-query"
            name="input-query"
            type="text"
            placeholder="🔍 Digite o produto"
            value={ inputQuery }
            onChange={ this.handleChangeQuery }
          />
          <button
            data-testid="query-button"
            onClick={ this.searchProducts }
            className="btn-primary"
          >
            Pesquisar
          </button>

          {/* //! Página de listagem dos produtos vazia */}
          {!resultSearch.length && isSearchCompleted === false && (
            <div>
              <h3 data-testid="home-initial-message">
                Digite algum termo de pesquisa ou escolha uma categoria.
              </h3>
              <Button />
            </div>
          )}

          {/* //! Quando a busca não retorna nada */}
          {isSearchCompleted && !resultSearch.length && (
            <p>Nenhum produto foi encontrado</p>
          )}

          {/* //! Lista de Produtos */}
          <div className="container-result">
            {resultSearch.map(({ id, title, thumbnail, price }) => (
              <div
                key={ id }
                data-testid="product"
                className="container-product"
              >
                <Link
                  data-testid="product-detail-link"
                  to={ `product/${id}` }
                >
                  <img src={ thumbnail } alt="" />
                  <p>{ title }</p>
                  <p>{ `R$ ${price}` }</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default ListProducts;
