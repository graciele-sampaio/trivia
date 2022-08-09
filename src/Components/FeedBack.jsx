import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Feedback extends Component {
  message = () => {
    // O componente pai deverá passar o número de respostas corretas através de Props
    const { numOfCorrectAnswers } = this.props;
    const mediumResult = 3;
    if (numOfCorrectAnswers < mediumResult) return 'Could be better..';
    if (numOfCorrectAnswers >= mediumResult) return 'Well Done!';
  }

  render() {
    return (
      <p data-testid="feedback-text">{this.message()}</p>
    );
  }
}

Feedback.propTypes = {
  numOfCorrectAnswers: PropTypes.number.isRequired,
};

export default Feedback;
