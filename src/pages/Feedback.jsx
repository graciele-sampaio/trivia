import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../Components/Header';

class Feedback extends Component {
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
  totalAssertions: PropTypes.number.isRequired,
  totalScore: PropTypes.number.isRequired,
};

const mapStateToProps = (store) => ({
  totalAssertions: store.player.assertions,
  totalScore: store.player.score,
});

export default connect(mapStateToProps)(Feedback);
