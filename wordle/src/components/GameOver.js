import React, { useContext } from 'react'
import { AppContext } from '../App'

function GameOver() {
    const {gameOver, currAttempt, correctWord} = useContext(AppContext)
  return (
    <div className="gameOver">
        <h2>{gameOver.guessedWord ? "You've correctly guessed the Wordle!" : "You failed.."}</h2>
        <h1>The correct word was "{correctWord}"</h1>
        {gameOver.guessedWord && (<h2>You guessed it in {currAttempt.attempt} attempts!</h2>)}
        </div>

  )
}

export default GameOver