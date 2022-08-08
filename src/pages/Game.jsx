import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../Components/Header';

class Game extends Component {
  state = {
    questions: [],
    order: 0,
    load: false,
  }

  componentDidMount() {
    this.requestQuests();
  }

  requestQuests = async () => {
    const { getToken } = this.props;    
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${getToken}`);
    const json = await response.json();
    if(json.response_code === 0) this.sucessRequest(json.results);
    if(json.response_code !== 0) this.failedRequest();
  }

  sucessRequest = (results) => {
    this.setState({questions:results, load: true});
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
      })
    );
  }

  handleDataTestId = (index, correctAnswer, currentAnswer) => {
    if(currentAnswer===correctAnswer) {return 'correct-answer'}
    else {return `wrong-answer-${index}`}
  };

  shuffleAnswers = (array) => {
    const arrayOrdered = array.sort(() => (Math.round(Math.random())-0.5));
    return arrayOrdered;
  }

  booleanQuestion = (correctAnswer) => {
    return this.shuffleAnswers([
      (<button
        data-testid={ this.handleDataTestId(0, correctAnswer, 'True') }
        key={ this.handleDataTestId(0, correctAnswer, 'True') }
      >
        True
      </button>),
      (<button
        data-testid={ this.handleDataTestId(1, correctAnswer, 'False') }
        key={ this.handleDataTestId(0, correctAnswer, 'False') }
      >
        False
      </button>)
    ]);
  }

  multipleQuestion = (question, correctAnswer) => {
    return this.shuffleAnswers([
        ...question.incorrect_answers,
        correctAnswer,
      ]).map((item, index) => (
        <button
          key={ this.handleDataTestId(index, correctAnswer, item) }
          data-testid={ this.handleDataTestId(index, correctAnswer, item) }
        >
          {item}
        </button>
      ));
  }

  renderQuestion = (questions, order) => {
    const question = questions[order];
    const correctAnswer = question.correct_answer;
    return (
      <div>
        <p data-testid='question-category'>{question.category}</p>
        <p data-testid='question-text'>{`Pergunta: ${question.question}`}</p>
        <span data-testid='answer-options'>
          {
            (question.type === 'multiple')
            ?  this.multipleQuestion(question, correctAnswer)
            :  this.booleanQuestion(correctAnswer)
          }
        </span>     
      </div>
    )
  }

  render() {
    const {load, questions, order} = this.state;

    return (
      <div data-testid="settings-title">
        <h1>Game</h1>
        <Header />
        {(load && questions.length > 0)
          ? this.renderQuestion(questions, order)
          : <h1>Carregando...</h1>
        }
        <button
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
