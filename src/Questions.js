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
  const category = JSON.parse(localStorage.getItem("category"));
  const numberOfQuestions = JSON.parse(localStorage.getItem("numberOfQuestions"))?.numberOfQuestions || 5;


  const filteredQuestions = (!category || !category.id || category.category === "mixed quiz") ? 
  questions : questions.filter(question => Number(question.idCategory) === Number(category.id));

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const correctAnswersCount = useRef(0);
  const [answersShuffled, setAnswersShuffled] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [questionsShuffled, setQuestionShuffled] = useState(false);
  const selectedAnswers = useRef([]);

  useEffect(() => {
    if (!questionsShuffled && filteredQuestions.length > 0) {
      setShuffledQuestions(shuffleArray(filteredQuestions).slice(0, numberOfQuestions));
      setQuestionShuffled(true);
    }
  }, [filteredQuestions, numberOfQuestions, questionsShuffled]);

  useEffect(() => {
    if (!answersShuffled && shuffledQuestions.length > 0) {
      const answers = [
        shuffledQuestions[currentQuestionIndex].firstAnswer,
        shuffledQuestions[currentQuestionIndex].secondAnswer,
        shuffledQuestions[currentQuestionIndex].correctAnswer,
        shuffledQuestions[currentQuestionIndex].thirdAnswer
      ];
      setShuffledAnswers(shuffleArray(answers));
      setAnswersShuffled(true);
    }
  }, [currentQuestionIndex, shuffledQuestions, answersShuffled]);

  const handleNextQuestion = (selectedAnswer) => {
    selectedAnswers.current = [...selectedAnswers.current, selectedAnswer];
    if (selectedAnswer === shuffledQuestions[currentQuestionIndex].correctAnswer) {
      correctAnswersCount.current += 1;
    }
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setAnswersShuffled(false);
    } else {
      endQuiz();
    }
  }

  const updateUserStatistics = async () => {
    try {
      const response = await fetch('http://localhost/Zavrsni rad/updateUserStats.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sessionData),
      });
      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error("ERROR WHILE UPDATING DATA: ", error);
    }
  }

  const endQuiz = () => {
    sessionData.correctAnswers += correctAnswersCount.current;
    sessionData.questionsAnswered += currentQuestionIndex + 1;
    sessionData.gamesPlayed += 1;

    let lastQuiz = {
      "questions": shuffledQuestions,
      "answers": selectedAnswers.current,
    };

    localStorage.setItem("sessionData", JSON.stringify(sessionData));
    localStorage.setItem("lastQuiz", JSON.stringify(lastQuiz));
    updateUserStatistics()
      .then(() => navigate("/play/quiz/results"));
  }

  if (!shuffledQuestions || shuffledQuestions.length === 0) {
    return (
      <div className='container-fluid text-center'>
        <p className='display-4 text-center mt-5' id="text">THERE ARE NO QUESTIONS FOR THIS CATEGORY!</p>
      </div>
    );
  }

  return (
    <>
      <div className='container-fluid text-center'>
        <md-filled-button id='questionButton' class='mt-3 mb-5 w-100' disabled>
          <div className="container w-100 h-100">
            <p className="questionText" id="questionText">{shuffledQuestions[currentQuestionIndex].questionText}</p>
          </div>
        </md-filled-button>
      </div>

      <div className='container-fluid text-center'>
        <div className='row'>
          {shuffledAnswers.map((answer, index) => (
            <div className='col-md-6' key={index}>
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
