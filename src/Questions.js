import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import '@material/web/all';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function Questions() {
  const navigate = useNavigate();
  const sessionData = JSON.parse(localStorage.getItem("sessionData"));
  const questions = JSON.parse(localStorage.getItem("questions"));
  const categories = JSON.parse(localStorage.getItem("categories"));

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  let correctAnswersCount = useRef(0);
  const [answersShuffled, setAnswersShuffled] = useState(false);

  useEffect(() => {
    if (!answersShuffled && questions[currentQuestionIndex]) {
      const answers = [
        questions[currentQuestionIndex].firstAnswer,
        questions[currentQuestionIndex].secondAnswer,
        questions[currentQuestionIndex].correctAnswer,
        questions[currentQuestionIndex].thirdAnswer
      ];
      setShuffledAnswers(shuffleArray(answers));
      setAnswersShuffled(true);
    }
  }, [currentQuestionIndex, questions, answersShuffled]);

  const handleNextQuestion = (selectedAnswer) => {
    if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
      correctAnswersCount.current += 1;
    }
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setAnswersShuffled(false);
    } else {
      endQuiz();
    }
  }

  const endQuiz = () => {
    sessionData.correctAnswers += correctAnswersCount.current;
    sessionData.questionsAnswered += currentQuestionIndex + 1;
    sessionData.gamesPlayed += 1;

    localStorage.setItem("sessionData", JSON.stringify(sessionData));
    navigate("/play/quiz/results");
  }

  return (
    <>
      <div className='container-fluid text-center'>
        <md-filled-button id='questionButton' class='mt-3 mb-5 w-100' disabled>
          <div className="container w-100 h-100">
            <p class="questionText" id="questionText">{questions[currentQuestionIndex].questionText}?</p>
          </div>
        </md-filled-button>
      </div>

      <div className='container-fluid text-center'>
        <div className='row'>
          {shuffledAnswers.map((answer, index) => (
            <div class='col-md-6' key={index}>
              <md-filled-button id='answerButton' class='mt-3 w-100' onClick={() => handleNextQuestion(answer)}>
                <p id='questionText'>{answer}</p>
              </md-filled-button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Questions;
