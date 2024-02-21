/* eslint-disable no-unused-vars */
import React from 'react';
import './App.css';
import '@material/web/all';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';

function Results() {
  const sessionData = JSON.parse(localStorage.getItem('sessionData'));
  const lastQuiz = JSON.parse(localStorage.getItem('lastQuiz'));
  
  const totalQuestions = lastQuiz ? lastQuiz.answers.length : 0;
  let correctAnswers = 0;
  
  if (lastQuiz) {
    lastQuiz.questions.forEach((question, index) => {
      if (lastQuiz.answers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });
  }

  return (
    <>
      <div className='container-fluid text-center mt-5'>
        <h1 id="text">Quiz Results</h1>
        <h4 className='text-center mt-2' id='text'>Total questions: {totalQuestions}</h4>
        <h4 className='text-center mt-2' id='text'>Correct answers: {correctAnswers}/{totalQuestions}</h4>
      </div>
      <div className="container-fluid text-center mt-5 mb-5">
        <h2 id="text">Answer Sheet</h2>
        {lastQuiz && lastQuiz.answers.map((answer, index) => (
          <div key={index} className="question">
            <h3 id="text" className='text-center mt-3'>{index + 1}. {lastQuiz.questions[index].questionText}</h3>
            <h4 id="text" className='text-center mt-3'>Correct Answer: {lastQuiz.questions[index].correctAnswer}</h4>
            <h4 id="text" className='text-center mt-3'>Your Answer: {answer}</h4>
          </div>
        ))}
      </div>
    </>
  );
  
}

export default Results;