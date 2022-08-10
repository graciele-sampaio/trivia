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
    return (
      <div data-testid="settings-title">
        <Header />
        <p data-testid="feedback-text">{this.message()}</p>
      </div>
    );
  }
}

Feedback.propTypes = {
  totalAssertions: PropTypes.number.isRequired,
};

const mapStateToProps = (store) => ({
  totalAssertions: store.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
