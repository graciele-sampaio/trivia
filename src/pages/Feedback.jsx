import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../Components/Header';

class Feedback extends Component {
  handlePlayAgain = () => {
    const { history } = this.props;
    history.push('/');
  }

  message = () => {
    const { totalAssertions } = this.props;
    const mediumResult = 3;
    if (totalAssertions < mediumResult) return 'Could be better...';
    if (totalAssertions >= mediumResult) return 'Well Done!';
  }

  render() {
    const { totalAssertions, totalScore } = this.props;

    return (
      <div data-testid="settings-title">
        <Header />
        <h1 data-testid="feedback-text">Feedback</h1>
        <button
          data-testid="btn-play-again"
          type="button"
          onClick={ this.handlePlayAgain }
        >
          Jogar novamente
        </button>
        <p data-testid="feedback-text">{this.message()}</p>
        <p>
          {'Final Score: '}
          <span data-testid="feedback-total-score">{totalScore}</span>
        </p>
        <p>
          {'Total Assertions: '}
          <span data-testid="feedback-total-question">{totalAssertions}</span>
        </p>
      </div>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  totalAssertions: PropTypes.number.isRequired,
  totalScore: PropTypes.number.isRequired,
};

const mapStateToProps = (store) => ({
  totalAssertions: store.player.assertions,
  totalScore: store.player.score,
});

export default connect(mapStateToProps)(Feedback);
