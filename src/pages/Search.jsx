import React, { Component } from 'react';
import Header from '../Components/Header';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      artistName: '',
      isDisabled: true,
    };
  }

  handleChange = ({ target }) => {
    const { value, name } = target;

    this.setState({
      [name]: value,
    });

    // verifica se o valor do inputname é maior ou igual a 2
    const MIN_CHAR = 2;
    const isValid = value.length >= MIN_CHAR;

    this.setState({
      isDisabled: !isValid,
    });
  };

  render() {
    const { artistName, isDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="search-artist-input">
            <input
              type="text"
              data-testid="search-artist-input"
              name="artistName"
              placeholder="Digite o nome do artista"
              value={ artistName }
              onChange={ this.handleChange }
            />
          </label>

          <button
            id="search-artist-button"
            type="submit"
            data-testid="search-artist-button"
            disabled={ isDisabled }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
