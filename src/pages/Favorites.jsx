import React, { Component } from 'react';
import Header from '../Components/Header';
import Loading from '../Components/Loading';
import MusicCard from '../Components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      favoritesSongs: [],
    };
  }

  componentDidMount() {
    this.getFavoritesMusics();
  }

  // funcao que pega as musicas favoritas, quando tiver a resposta pega o data e checa se tem musica favorita
  getFavoritesMusics() {
    getFavoriteSongs()
      .then((data) => {
        this.setState({
          favoritesSongs: data,
        });
      });
  }

  render() {
    const { isLoading, favoritesSongs } = this.state;

    return (
      <div data-testid="page-favorites">
        <Header />

        {isLoading ? (
          <Loading />
        ) : (
          <div>
            aqui mostra o array de musicas favoritas
            {favoritesSongs.map((music) => (
              <MusicCard
                key={ music.trackId } // quando precisar repetir o mesmo componente varias vezes precisa de uma key unica
                music={ music }
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default Favorites;
