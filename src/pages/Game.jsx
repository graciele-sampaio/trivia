import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../Components/Header';

class Game extends Component {
  state = {
    questions: [],
    order: 0,
    load: false,
    answered: false,
  }

  componentDidMount() {
    this.requestQuests();
  }

  requestQuests = async () => {
    const { getToken } = this.props;
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${getToken}`);
    const json = await response.json();
    if (json.response_code === 0) this.sucessRequest(json.results);
    if (json.response_code !== 0) this.failedRequest();
  }

  sucessRequest = (results) => {
    this.setState({ questions: results, load: true });
  }

  failedRequest = () => {
    const { history } = this.props;
    localStorage.removeItem('token');
    history.push('/');
  }

  handleClick = () => {
    this.setState(
      (previousState) => ({
        order: previousState.order + 1,
      }),
    );
  }

  handleDataTestId = (index, correctAnswer, currentAnswer) => {
    if (currentAnswer === correctAnswer) { return 'correct-answer'; }
    return `wrong-answer-${index}`;
  };

  shuffleAnswers = (array) => {
    const number = 0.5;
    const arrayOrdered = array.sort(() => (Math.round(Math.random()) - number));
    return arrayOrdered;
  }

  verificationResponse = () => {
    // const { answered } = this.state;
    this.setState({ answered: true });
  }

  changeColor = (item) => {
    const { answered, questions, order } = this.state;
    const option = questions[order];
    if (!answered) {
      return { border: 'none' };
    } if (answered && item === option.correct_answer) {
      return { border: '3px solid rgb(6, 240, 15' };
    } return { border: '3px solid red' };
  }

  multipleQuestion = (question, correctAnswer) => this.shuffleAnswers([
    ...question.incorrect_answers,
    correctAnswer,
  ]).map((item, index) => (
    <button
      type="button"
      style={ this.changeColor(item) }
      onClick={ this.verificationResponse }
      key={ this.handleDataTestId(index, correctAnswer, item) }
      data-testid={ this.handleDataTestId(index, correctAnswer, item) }
    >
      {item}
    </button>
  ))

  changeColorBool = (correctAnswer) => {
    const { answered } = this.state;
    if (!answered) {
      return { border: 'none' };
    }
    if (correctAnswer === 'correct-answer' && answered) {
      return { border: '3px solid rgb(6, 240, 15' };
    } return { border: '3px solid red' };
  }

 booleanQuestion = (correctAnswer) => this.shuffleAnswers([
   (
     <button
       type="button"
       onClick={ this.verificationResponse }
       data-testid={ this.handleDataTestId(0, correctAnswer, 'True') }
       style={ this.changeColorBool(this.handleDataTestId(0, correctAnswer, 'True')) }
       key={ this.handleDataTestId(0, correctAnswer, 'True') }
     >
       True
     </button>
   ),
   (
     <button
       type="button"
       style={ this.changeColorBool(this.handleDataTestId(0, correctAnswer, 'False')) }
       onClick={ this.verificationResponse }
       data-testid={ this.handleDataTestId(1, correctAnswer, 'False') }
       key={ this.handleDataTestId(0, correctAnswer, 'False') }
     >
       False
     </button>
   ),
 ])

  renderQuestion = (questions, order) => {
    const question = questions[order];
    const correctAnswer = question.correct_answer;
    return (
      <div>
        <p data-testid="question-category">{question.category}</p>
        <p data-testid="question-text">{`Pergunta: ${question.question}`}</p>
        <span data-testid="answer-options">
          {
            (question.type === 'multiple')
              ? this.multipleQuestion(question, correctAnswer)
              : this.booleanQuestion(correctAnswer)
          }
        </span>
      </div>
    );
  }

  render() {
    const { load, questions, order } = this.state;
    return (
      <div data-testid="settings-title">
        <h1>Game</h1>
        <Header />
        {(load && questions.length > 0)
          ? this.renderQuestion(questions, order)
          : <h1>Carregando...</h1>}
        <button
          type="button"
          onClick={ this.handleClick }
        >
          Próxima Questão
        </button>
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  getToken: PropTypes.string.isRequired,
};

const mapStateToProps = (store) => ({
  getToken: store.apiToken.token,
});

export default connect(mapStateToProps)(Game);
