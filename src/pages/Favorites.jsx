import React, { Component } from 'react';
import Header from '../Components/Header';
import Loading from '../Components/Loading';

class Favorites extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
    };
  }

  render() {
    const { isLoading } = this.state;

    return (
      <div data-testid="page-favorites">
        <Header />

        {isLoading ? (
          <Loading />
        ) : (
          <div className="favorites-container">
            k
          </div>
        )}
      </div>
    );
  }
}

export default Favorites;
