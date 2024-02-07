/* eslint-disable no-unused-vars */
import React from 'react';
import './App.css';
import '@material/web/all';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';

function Results() {
  const sessionData = JSON.parse(localStorage.getItem('sessionData'));

  return (
    <>
      <div className='container-fluid text-center'>
          <p className='display-4 text-center mt-5' id='text' >TO DO</p>
          <p className='display-4 text-center mt-5' id='text' >Correct answers: {sessionData.correctAnswers}</p>
          <p className='display-4 text-center mt-5' id='text' >Games played: {sessionData.gamesPlayed}</p>
          <p className='display-4 text-center mt-5' id='text' >Questions answered: {sessionData.questionsAnswered}</p>
      </div>
    </>
  );
}

export default Results;
