import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      inputName: '',
      isLoading: true,
    };
  }

  // ref: https://pt-br.reactjs.org/docs/state-and-lifecycle.html
  componentDidMount() {
    this.recoverUserName();
  }

  recoverUserName = async () => {
    const getUserName = await getUser();
    this.setState({
      inputName: getUserName.name,
      isLoading: false,
    });
  }

  render() {
    const { isLoading, inputName } = this.state;

    return (
      <header data-testid="header-component">
        {isLoading ? (<Loading />) : (
          <p data-testid="header-user-name">{ inputName }</p>)}
      </header>
    );
  }
}

export default Header;
