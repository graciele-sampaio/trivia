import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Feedback extends Component {
  handlePlayAgain = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    return (
      <div data-testid="settings-title">
        <h1 data-testid="feedback-text">Feedback</h1>
        <button
          data-testid="btn-play-again"
          type="button"
          onClick={ this.handlePlayAgain }
        >
          Jogar novamente
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Feedback;
