import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      name: '',
    };
  }

    onInputChange = ({ target }) => {
      const { name, value } = target;
      this.setState({
        [name]: value,
      });
      console.log(name, value);
    };

    onValidateButton = () => {
      const { email, name } = this.state;
      return !(email && name);
    }

    render() {
      const { history } = this.props;
      const { email, name } = this.state;

      return (
        <div>

          <label htmlFor="name-input">
            Nome:
            <input
              data-testid="input-player-name"
              id="name"
              name="name"
              value={ name }
              onChange={ this.onInputChange }
            />
          </label>

          <label htmlFor="email-input">
            Email:
            <input
              data-testid="input-gravatar-email"
              id="email"
              name="email"
              value={ email }
              onChange={ this.onInputChange }
            />
          </label>

          <button
            type="button"
            disabled={ this.onValidateButton() }
            data-testid="btn-play"
          >
            Play
          </button>

          <button
            type="button"
            data-testid="btn-settings"
            onClick={ () => history.push('/settings') }
          >
            Configurações
          </button>
        </div>
      );
    }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;
