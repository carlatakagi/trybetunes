import React, { Component } from 'react';
import Header from '../Components/Header';

class Search extends Component {
  render() {
    return (
      <div data-testid="page-search">
        <Header />
        <h2>pesquisar</h2>
      </div>
    );
  }
}

export default Search;
