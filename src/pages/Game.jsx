import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../Components/Header';
import '../styles/Game.css';
import { savePlayerScore, saveAssertions } from '../redux/actions';

class Game extends Component {
  state = {
    timer: 30,
    // answeringTime: 0,
    questions: [],
    order: 0,
    load: false,
    answered: false,
    showNextButton: false,
    lastQuestion: false,
  };

  componentDidMount() {
    this.requestQuests();
  }

  componentDidUpdate() {
    this.handleTimer();
  }

  requestQuests = async () => {
    const { getToken } = this.props;
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${getToken}`);
    const json = await response.json();
    if (json.response_code === 0) this.sucessRequest(json.results);
    if (json.response_code !== 0) this.failedRequest();
  };

  sucessRequest = (results) => {
    this.setState({ questions: results, load: true });
  };

  failedRequest = () => {
    const { history } = this.props;
    localStorage.removeItem('token');
    history.push('/');
  };

  handleNextQuestion = () => {
    const numberMaxQuestions = 4;
    this.setState((previousState) => ({
      order:
        previousState.order < numberMaxQuestions ? previousState.order + 1 : 0,
      lastQuestion: previousState.order === numberMaxQuestions,
      showNextButton: false,
      answered: false,
      timer: 30,
    }));
  };

  handleQuestionResults = () => {
    const { questions, order } = this.state;
    const allOptions = document.querySelectorAll('.question');
    allOptions.forEach((option) => {
      const isCorrect = option.innerText === questions[order].correct_answer;
      if (isCorrect) option.classList.add('rigth-question');
      if (!isCorrect) option.classList.add('wrong-question');
    });
  }

  getDifficultyMultiplier = (difficulty) => {
    const easyPoints = 1;
    const mediumPoints = 2;
    const hardPoints = 3;
    if (difficulty === 'easy') return easyPoints;
    if (difficulty === 'medium') return mediumPoints;
    if (difficulty === 'hard') return hardPoints;
  };

  handleScore = (difficulty) => {
    const { timer } = this.state;
    const { updateScore, updateAssertions } = this.props;
    const currDifficulty = this.getDifficultyMultiplier(difficulty);
    const defaultPoints = 10;
    updateScore(defaultPoints + (timer * currDifficulty));
    updateAssertions();
  }

  handleClick = (target) => {
    const { questions, order, answered } = this.state;
    const answeredCorrectly = target.innerHTML === questions[order].correct_answer;
    if (answeredCorrectly && !answered) this.handleScore(questions[order].difficulty);
    this.setState({
      showNextButton: true,
      answered: true,
    });
    this.handleQuestionResults();
  }

  handleDataTestId = (currQuestion, index) => {
    const { questions, order } = this.state;
    const correctAnswer = questions[order].correct_answer;
    if (currQuestion === correctAnswer) {
      return 'correct-answer';
    }
    return `wrong-answer-${index}`;
  };

  handleQuestions = (allQuestions) => {
    const { answered, timer } = this.state;
    return allQuestions.map((currQuestion, index) => (
      <button
        type="button"
        onClick={ ({ target }) => this.handleClick(target, currQuestion) }
        data-testid={ this.handleDataTestId(currQuestion, index) }
        key={ currQuestion }
        disabled={ answered || timer === 0 }
        className="question"
      >
        { currQuestion }
      </button>
    ));
  }

  shuffleAnswers = (question) => {
    const allQuestions = [...question.incorrect_answers, question.correct_answer];
    const number = 0.5;
    const shuffledArray = allQuestions.sort(() => Math.round(Math.random()) - number);
    return this.handleQuestions(shuffledArray);
  };

  renderQuestion = (questions, order) => {
    const question = questions[order];
    return (
      <div>
        <p data-testid="question-category">{question.category}</p>
        <p>Pergunta :</p>
        <p data-testid="question-text">{question.question}</p>
        <span data-testid="answer-options">
          { this.shuffleAnswers(question) }
        </span>
      </div>
    );
  };

  handleTimer = () => {
    const { timer, answered } = this.state;
    if (timer > 0 && !answered) {
      this.timer = setTimeout(() => {
        this.setState({
          timer: timer - 1,
        });
      }, '1000');
    }
    if (answered || timer === 0) clearInterval(this.timer);
  }

  render() {
    const { load, questions, order, showNextButton, timer, lastQuestion } = this.state;
    return (
      <div data-testid="settings-title">
        <h1>Game</h1>
        <Header />
        <h2>{timer}</h2>
        { lastQuestion && <Redirect to="/feedback" /> }
        {load && questions.length > 0 ? (
          this.renderQuestion(questions, order)
        ) : (
          <h1>Carregando...</h1>
        )}
        {showNextButton && (
          <button
            data-testid="btn-next"
            type="button"
            onClick={ this.handleNextQuestion }
          >
            Próxima Questão
          </button>
        )}
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  getToken: PropTypes.string.isRequired,
  updateScore: PropTypes.func.isRequired,
  updateAssertions: PropTypes.func.isRequired,
};

const mapStateToProps = (store) => ({
  getToken: store.apiToken.token,
});

const mapDispatchToProps = (dispatch) => ({
  updateScore: (score) => dispatch(savePlayerScore(score)),
  updateAssertions: () => dispatch(saveAssertions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
