import React from 'react';
import * as api from '../services/api';
import Button from '../components/Button';

// api.getCategories().then((categories) => { console.log(categories); });

// api.getProductsFromCategoryAndQuery('acessórios').then((categories) => {
//   console.log(categories);
// });

// api.getProductsFromCategoryAndQuery('MLB5672').then((categories) => {
//   console.log(categories);
// });

const INDEX_NOT_FOUND = -1;

class ListProducts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      handleCategories: [],
      selectedCategoryId: [],
      resultQuery: [],
      inputQuery: '',
    };

    // this.handleInputCheckbox = this.handleInputCheckbox.bind(this);

    // this.searchProducts = this.searchProducts.bind(this);
  }

  componentDidMount() {
    this.handleFetchCategory();
    // this.searchProducts();
  }

  handleFetchCategory = async () => {
    const categories = await api.getCategories();

    this.setState({ handleCategories: [...categories] });
  };

  handleInputCheckbox({ target }) {
    const { value } = target;
    const { checked } = target;

    this.setState((prevState) => {
      const { selectedCategoryId } = prevState;

      if (checked) {
        return { selectedCategoryId: [...selectedCategoryId, value] };
      }

      const index = selectedCategoryId.indexOf(value);

      if (index > INDEX_NOT_FOUND) {
        const newSelectedCategoryId = [...selectedCategoryId];
        newSelectedCategoryId.splice(index, 1);
        return { selectedCategoryId: newSelectedCategoryId };
      }

      return null;
    });
  }

  handleSearchBtn = async () => {
    const { inputQuery } = this.state;

    const result = await api.getProductQuery(inputQuery);
    this.setState({ resultQuery: result.results });
  };

  handleInputQuery = async ({ target }) => {
    const { value } = target;

    this.setState({ inputQuery: value });
  };

  // searchProducts = async () => {
  //   const { selectedCategoryId, inputQuery } = this.state;

  //   let categories = [];

  //   if (selectedCategoryId.length > 0) {
  //     const promises = selectedCategoryId
  //       .map((id) => api.getProductsFromCategoryAndQuery(id));

  //     const results = await Promise.all(promises);

  //     categories = results.reduce((acc, result) => acc.concat(result), []);
  //   }

  //   if (inputQuery) {
  //     const result = await api.getProductsFromCategoryAndQuery(inputQuery);
  //     categories = [...result];
  //   }

  //   this.setState({ categoriesSelected: categories });
  //   console.log(categories);
  // };

  render() {
    const {
      handleCategories,
      // selectedCategoryId,
      resultQuery,
      inputQuery,
    } = this.state;
    console.log(resultQuery);

    return (
      <div className="container">
        <div className="categories-container">
          {handleCategories.map((category) => (
            <label
              key={ category.id }
              data-testid="category"
              htmlFor={ category.id }
            >
              <input
                id={ category.id }
                name={ category.id }
                type="checkbox"
                value={ category.id }
                onChange={ this.handleInputCheckbox }
              />
              {category.name}
            </label>
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
                  </div>
                ))}
              </div>
            ) : (
              <p>Nenhum produto foi encontrado</p>
            )}
        </div>

      </div>
    );
  }
}

export default ListProducts;
