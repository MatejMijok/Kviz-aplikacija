import React, { useState } from 'react';
import './App.css';
import '@material/web/all';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';

function Questions() {
  const navigate = useNavigate();
  const sessionData = JSON.parse(localStorage.getItem("sessionData"));
  /* const category = JSON.parse(localStorage.getItem("category")); KADA BUDEM IMPLEMENTIRAO KATEGORIJE BIT CE KORISTENO */
  const questions = JSON.parse(localStorage.getItem("questions"));

  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleNextQuestion = (e) => {
    console.log(e.target.value);
    if(e.target.value === questions[currentQuestionIndex].correctAnswer){
      setCorrectAnswers(correctAnswers+1);
      console.log("Correct!");
    }
    if(currentQuestionIndex < questions.length - 1){
    setCurrentQuestionIndex(currentQuestionIndex+1);
    }else{
      endQuiz();
    }
  }
  
  const endQuiz = () => {
    sessionData.correctAnswers += correctAnswers;
    sessionData.questionsAnswered += currentQuestionIndex+1; // CUSTOM BROJ PITANJA PRIVREMENO HARD CODED
    sessionData.gamesPlayed += 1;

    localStorage.setItem("sessionData", JSON.stringify(sessionData));
    /*
      TO  DO
      SLANJE NA SERVER

    */

    navigate("/play/quiz/results");
  }
  return (
    <>
      <div className='container-fluid text-center'>
        <md-filled-button id='questionButton' class='mt-3 mb-5 w-100' disabled>
          <p id='questionText'>{questions[currentQuestionIndex].questionText}?</p>
        </md-filled-button>
      </div>

      <div className='container-fluid text-center'>
        <div className='row'>
          <div className='col-md-6'>
            <md-filled-button id='answerButton' class='mt-3 w-100' onClick={ (e) => {handleNextQuestion(e);}} value={questions[currentQuestionIndex].firstAnswer}> 
              <p id='questionText'>{questions[currentQuestionIndex].firstAnswer}</p>
            </md-filled-button>
          </div>
          <div className='col-md-6'>
            <md-filled-button id='answerButton' class='mt-3 w-100' onClick={ (e) => {handleNextQuestion(e);}} value={questions[currentQuestionIndex].secondAnswer}>
              <p id='questionText'>{questions[currentQuestionIndex].secondAnswer}</p>
            </md-filled-button>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-6'>
            <md-filled-button id='answerButton' class='mt-3 w-100' onClick={ (e) => {handleNextQuestion(e);}} value={questions[currentQuestionIndex].correctAnswer}>
              <p id='questionText'>{questions[currentQuestionIndex].correctAnswer}</p>
            </md-filled-button>
          </div>
          <div className='col-md-6'>
            <md-filled-button id='answerButton' class='mt-3 w-100' onClick={ (e) => {handleNextQuestion(e);}} value={questions[currentQuestionIndex].thirdAnswer}>
              <p id='questionText'>{questions[currentQuestionIndex].thirdAnswer}</p>
            </md-filled-button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Questions;
