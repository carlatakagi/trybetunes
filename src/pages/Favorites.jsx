import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import Loading from '../Components/Loading';
import MusicCard from '../Components/MusicCard';

class Favorites extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
    };
  }

  render() {
    const { favoriteSongs } = this.props;
    const { isLoading } = this.state;
    console.log(favoriteSongs);

    return (
      <div data-testid="page-favorites">
        <Header />

        {isLoading ? (
          <Loading />
        ) : (
          <div className="favorites-container">
            aqui mostra o array de musicas favoritas
            <MusicCard />
          </div>
        )}
      </div>
    );
  }
}

Favorites.propTypes = {
  favoriteSongs: PropTypes.arrayOf(PropTypes.shape({
    trackId: PropTypes.number.isRequired,
  })).isRequired,
};

export default Favorites;
