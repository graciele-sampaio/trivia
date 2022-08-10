import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Feedback from '../pages/Feedback';
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";

describe('', () => {
 test('', () => {
    const { history } = renderWithRouterAndRedux(<Feedback />)
    history.push('/feedback')
    const couldBeBetter = screen.getByText(/Could be better.../i)
    expect(couldBeBetter).toBeDefined()
  })

  test('', () => {
    const { history } = renderWithRouterAndRedux(<Feedback />)
    history.push('/feedback')
    const playerName = screen.getByTestId('header-player-name')
    expect(playerName).toBeInTheDocument()
  })

  test('', () => {
    const { history } = renderWithRouterAndRedux(<Feedback />)
    history.push('/feedback')
    const feedbackText = screen.getByTestId('feedback-text')
    expect(feedbackText).toBeInTheDocument()
  })

  test('', () => {
    const { history } = renderWithRouterAndRedux(<Feedback />)
    history.push('/feedback')
    const profilePicture = screen.getByTestId('header-profile-picture')
    expect(profilePicture).toBeInTheDocument()
  })
  
  test('', () => {
    const { history } = renderWithRouterAndRedux(<Feedback />)
    history.push('/feedback')
    const playAgain = screen.getByTestId('btn-play-again')
    userEvent.click(playAgain)
    expect(history.location.pathname).toBe('/')
  })
})