import React from 'react';
import * as api from '../services/api';
import Button from '../components/Button';

// api.getCategories().then((categories) => { console.log(categories); });

api.getProductsFromCategoryAndQuery('acessórios').then((categories) => {
  console.log(categories);
});

api.getProductsFromCategoryAndQuery('MLB5672').then((categories) => {
  console.log(categories);
});

const INDEX_NOT_FOUND = -1;

class ListProducts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      handleCategories: [],
      selectedCategoryId: [],
      categoriesSelected: [],
      inputQuery: '',
    };

    this.handleInputCheckbox = this.handleInputCheckbox.bind(this);
    this.handleInputQuery = this.handleInputQuery.bind(this);
    this.searchProducts = this.searchProducts.bind(this);
  }

  componentDidMount() {
    this.handleFetchCategory();
    this.searchProducts();
  }

  handleFetchCategory = async () => {
    const categories = await api.getCategories();

    this.setState({ handleCategories: [...categories] });
  };

  //! CRIA O BOTÃOOOOOOOO

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

  handleInputQuery({ target }) {
    const { value } = target;

    this.setState({ inputQuery: value });
  }

  searchProducts = async () => {
    const { selectedCategoryId, inputQuery } = this.state;

    let categories = [];

    if (selectedCategoryId.length > 0) {
      const promises = selectedCategoryId
        .map((id) => api.getProductsFromCategoryAndQuery(id));

      const results = await Promise.all(promises);

      categories = results.reduce((acc, result) => acc.concat(result), []);
    }

    if (inputQuery) {
      const result = await api.getProductsFromCategoryAndQuery(inputQuery);
      categories = [...result];
    }

    this.setState({ categoriesSelected: categories });
    console.log(categories);
  };

  render() {
    const {
      handleCategories,
      selectedCategoryId,
      categoriesSelected,
      inputQuery,
    } = this.state;
    console.log(categoriesSelected);

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
            id="input-query"
            name="input-query"
            type="text"
            placeholder="🔍 Digite o produto"
            value={ inputQuery }
            onChange={ this.handleInputQuery }
          />
          {selectedCategoryId.length === 0
            ? (
              <div>
                <h3
                  data-testid="home-initial-message"
                >
                  Digite algum termo de pesquisa ou escolha uma categoria.
                </h3>
                <Button />
              </div>
            )
            : (
              <p>resultado</p>
            )}
        </div>
      </div>
    );
  }
}

export default ListProducts;
