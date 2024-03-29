import './App.css';
import Board from "./components/Board";
import Keyboard from './components/Keyboard';
import { createContext, useEffect, useState } from 'react';
import { boardDefault, generateWordSet } from './Words';
import GameOver from "./components/GameOver";
import ToggleMode from "./components/navToggle/ToggleMode"


export const AppContext = createContext();

function App() {
    const [board, setBoard] = useState(boardDefault)
    const [currAttempt, setCurrAttempt] = useState({attempt: 0, letterPos: 0})
    const [wordSet, setWordSet] = useState(new Set())
    const [disabledLetters, setDisabledLetter] = useState([]);
    const [enabledLetters, setEnabledLetter] = useState([]);
    const [almostLetters, setAlmostLetter] = useState([]);
    const [correctWord, setCorrectWord] = useState("")
    const [gameOver, setGameOver] = useState({gameOver: false, guessedWord: false});

    useEffect(() => {
        generateWordSet().then((words) => {
            setWordSet(words.wordSet);
            setCorrectWord(words.todaysWord);
        })
    }, [])

    const onSelectLetter = (keyVal) => {
        if(currAttempt.letterPos > 4) return;
        const newBoard = [...board];
        newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal;
        setBoard(newBoard);
        setCurrAttempt({...currAttempt, letterPos: currAttempt.letterPos + 1});
    }

    const onDelete = () => {
        if(currAttempt.letterPos === 0) return;
        const newBoard = [...board];
        newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = "";
        setBoard(newBoard);
        setCurrAttempt({...currAttempt, letterPos: currAttempt.letterPos - 1});
    }

    const onEnter = () => {
        if(currAttempt.letterPos !== 5) return;

        let currWord = "";
        for (let i=0; i < 5; i++){
            currWord += board[currAttempt.attempt][i].toLowerCase();
        }

        if(wordSet.has(currWord.toLowerCase())) {
            setCurrAttempt({attempt: currAttempt.attempt + 1, letterPos: 0});
        } else if(!(wordSet.has(currWord.toLowerCase()))) {
            alert("Word Not Found")
        }

        if (currWord === correctWord) {
            setGameOver({gameOver: true, guessedWord: true});
            return;
        }

        if (currAttempt.attempt === 5 && wordSet.has(currWord.toLowerCase())) {
            setGameOver({gameOver: true, guessedWord: false});
        } else if(currAttempt.attempt === 5 && !(wordSet.has(currWord.toLowerCase()))){
            return;
        }
    }

  return (
    <div className="App">
        <nav>
            <h3 className="centerNav"> </h3>
            <h1>Wordle</h1>
            <div className="toggleMode">
            <ToggleMode/>
            </div>
        </nav>
        <AppContext.Provider value ={{ board, setBoard, currAttempt, setCurrAttempt, onSelectLetter, onDelete, onEnter, correctWord, disabledLetters, setDisabledLetter, setGameOver, gameOver, enabledLetters, setEnabledLetter, almostLetters, setAlmostLetter}}>
        <div className="game">
            <Board />
            {gameOver.gameOver ? <GameOver /> : <Keyboard />}
        </div>
        </AppContext.Provider>

    </div>
  );
}

export default App;
