import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from '../Components/Loading';
import { createUser } from '../services/userAPI';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      inputName: '',
      isButtonDisabled: true,
      isLoading: false,
    };
  }

  handleChange = ({ target }) => {
    const { value, name } = target;

    this.setState({
      [name]: value,
    });

    // verifica se o valor do inputname é maior que 3
    const MIN_CHAR = 3;
    const isValid = value.length >= MIN_CHAR;

    this.setState({
      isButtonDisabled: !isValid,
    });
  };

    /* 03/02/2022 Mentoria nas breakouts com Cestari - hack para redirecionar pagina
     https://reactrouter.com/web/api/history
     copia de window.history que é como o browser consegue controlar a navegação
    */
    saveUserAndLoadingPage = async () => {
      this.setState({ isLoading: true });
      const { inputName } = this.state;
      const { history } = this.props;
      await createUser({ name: inputName });
      history.push('/search');
      this.setState({ isLoading: false });
    };

    render() {
      const { inputName, isButtonDisabled, isLoading } = this.state;

      return (
        <div data-testid="page-login">
          <h2>Login</h2>
          {isLoading ? (<Loading />) : (
            <form>
              <label htmlFor="login-name-input">
                <p>Login:</p>
                <input
                  type="text"
                  data-testid="login-name-input"
                  name="inputName"
                  value={ inputName }
                  onChange={ this.handleChange }
                />
              </label>

              <button
                id="login-submit-button"
                type="submit"
                data-testid="login-submit-button"
                disabled={ isButtonDisabled }
                onClick={ this.saveUserAndLoadingPage }
              >
                Entrar
              </button>
            </form>
          )}
        </div>
      );
    }
}

export default Login;

// Na monitoria do Thalles 04/02/2022, ele comentou sobre o proptypes.shape para utilizar com objeto
// proptypes.shape() => https://stackoverflow.com/questions/52109592/react-router-the-prop-history-is-undefined
// https://pt-br.reactjs.org/docs/typechecking-with-proptypes.html
Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};
