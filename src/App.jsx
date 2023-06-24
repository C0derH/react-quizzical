import { useState, useEffect } from 'react'
import './App.css'
import { decode } from 'html-entities'
import Intro from './components/Intro'
import Question from './components/Question'
import { nanoid } from 'nanoid'

function App() {
  const [questions, setQuestions] = useState([])
  const [isStarted, setIsStarted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isQuizOver, setIsQuizOver] = useState(false)
  const [score, setScore] = useState(`${0}/${questions.length}`)

  // Function to start the quiz
  function startQuiz() {
    setIsStarted(true)
  }

  useEffect(() => {
    if (isStarted && !isQuizOver) {
      setIsLoading(true)
      // Fetch quiz questions from an API
      fetch('https://opentdb.com/api.php?amount=5')
        .then((res) => res.json())
        .then((data) => {
          // Creating new question objects with data coming from API and setting the state with it.
          setQuestions(
            data.results.map((item) => {
              return {
                id: nanoid(),
                question: decode(item.question),//Decoding some of the html entities
                correctAnswer: decode(item.correct_answer),
                answers: getAnswersObjArray([
                  item.correct_answer,
                  ...item.incorrect_answers
                ]),
                selectedAnswer: ''
              }
            })
          )
          setIsLoading(false)
        })
    }
  }, [isStarted, isQuizOver])

  // Function to shuffle an array
  function arrayShuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const temp = arr[i]
      arr[i] = arr[j]
      arr[j] = temp
    }
    return arr
  }

  // Function to create an array of answer objects and shuffle them
  function getAnswersObjArray(answers) {
    const answersObjArray = answers.map((answer) => ({
      id: nanoid(),
      value: decode(answer)
    }))
    return arrayShuffle(answersObjArray)
  }

  // Function to handle click on an answer
  function handleAnswerClick(questionId, value) {
    setQuestions((prevQuestions) =>
      prevQuestions.map((item) => {
        if (item.id === questionId) {
          return {
            ...item,
            selectedAnswer: value
          }
        } else {
          return item
        }
      })
    )
  }

  // Function to check answers when the user clicks the "Check answers" button
  function checkAnswers() {
    const isAllAnswersSelected = questions.every((item) => item.selectedAnswer)
    if (isAllAnswersSelected) {
      let scoreCount = 0
      questions.forEach((question) => {
        if (question.selectedAnswer === question.correctAnswer) {
          scoreCount++
        }
      })
      setScore(`${scoreCount}/${questions.length}`)
      setIsQuizOver(true)
    }
  }

  // Function to play the quiz again
  function playAgain() {
    setIsQuizOver(false)
  }

  // Render the question components based on the fetched questions
  const questionElements = questions.map((item) => (
    <Question
      key={item.id}
      answers={item.answers}
      question={item.question}
      id={item.id}
      handleAnswerClick={handleAnswerClick}
      selectedAnswer={item.selectedAnswer}
      isQuizOver={isQuizOver}
      correctAnswer={item.correctAnswer}
    />
  ))

  return (
    <>
      <img className={`blob blob-top ${isStarted && "started-blob-top"}`} src='/blob.png' />
      <img className={`blob blob-bottom ${isStarted && "started-blob-bottom"}`} src='/blue-blob.png' />
      {!isStarted ? (
        <Intro startQuiz={startQuiz} />
      ) : (
        <main>
          {isLoading ? (
            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
          ) : (
            <>
              {questionElements}
              <div className="actions">
                {isQuizOver ? (
                  <div className='flex-container'>
                    <p className='score-text'>You scored {score} correct answers</p>
                    <button onClick={playAgain} className="btn action-btn check-answers-btn">Play Again</button>
                  </div>
                ) : (
                  <button onClick={checkAnswers} className="btn action-btn check-answers-btn">Check answers</button>
                )}
              </div>
            </>
          )}
        </main>
      )}
    </>
  )
}

export default App