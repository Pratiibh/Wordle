import wordBank from './wordle-bank.txt'
import correctWordBank from './wordle-bank-correct.txt'
export const boardDefault = [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
]

export const generateWordSet = async () => {
    let wordSet;
    let todaysWord;
    await Promise.all([
    fetch(correctWordBank)
        .then((response) => response.text())
        .then((result) =>  {
            const wordArr = result.split("\n")
            todaysWord = wordArr[Math.floor(Math.random() * wordArr.length)]
        }),

    fetch(wordBank)
        .then((response) => response.text())
        .then((result) => {
            const wordArr = result.split("\n")
            wordSet = new Set (wordArr)
        })
    ]);
    return { wordSet, todaysWord };
}