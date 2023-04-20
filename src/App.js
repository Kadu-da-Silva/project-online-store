import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import * as api from './services/api';
import Products from './pages/Products';
import Cart from './pages/Cart';

// api.getCategories().then((categories) => { console.log(categories); });

// api.getProductsFromCategoryAndQuery('carro').then((categories) => {
//   console.log(categories);
// });

// api.getProductsFromCategoryAndQuery('MLB2203652659').then((categories) => {
//   console.log(categories);
// });

const INDEX_NOT_FOUND = -1;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      handleCategories: [],
      selectedCategoryId: [],
    };

    this.handleInputCheckbox = this.handleInputCheckbox.bind(this);
  }

  componentDidMount() {
    this.handleFetchCategory();
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

  render() {
    const { handleCategories, selectedCategoryId } = this.state;
    console.log(selectedCategoryId);
    return (
      <main>
        <header>
          <h1>Online Store</h1>
        </header>
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
          <div>
            <Switch>
              <Route exact path="/" component={ Products } />
              <Route exact path="/cart" component={ Cart } />
            </Switch>
          </div>
        </div>
      </main>
    );
  }
}
export default App;
