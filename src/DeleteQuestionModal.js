/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { Modal } from 'react-bootstrap';
import '@material/web/all';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

function DeleteQuestionModal({ show, handleClose }) {
  const [question, setQuestion] = useState();

  const [questions, setQuestions] = useState([]);

  const [errors, setErrors] = useState({
    newCategoryName: undefined,
  });

  const handleSelectChange = (e) => {
    const selectedIndex = e.target.selectedIndex;
    const selectedQuestion = questions[selectedIndex];
    setQuestion(selectedQuestion);
  };

  const checkEmpty = async (e) => {
    const { name, value } = e.target;
    const isEmpty = value.trim() === '';
    
    if (isEmpty) {
      e.target.setCustomValidity(`${name} cannot be empty`);
    } else {
      e.target.setCustomValidity('');
    }
    
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: isEmpty ? `${name} cannot be empty` : undefined,
    }));
  };

  useEffect(() => {
    const selectElement = document.querySelector('#questionDeleteSelect');
    if (selectElement) {
      selectElement.addEventListener('change', handleSelectChange);
    }
    return () => {
      if (selectElement) {
        selectElement.removeEventListener('change', handleSelectChange);
      }
    };
  });

  const fetchQuestions = async () => {
    try {
      const response = await fetch('http://localhost/Zavrsni rad/fetchQuestions.php');
      const data = await response.json();
      console.log(data);
      return data.data;
    } catch {
      console.error('Error fetching questions');
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const fetchedQuestions = await fetchQuestions();
      setQuestions(fetchedQuestions);
    };
    if(show){
      fetchData();
    }
  }, [show]); 

  
  const handleDeleteQuestion = () => {
    const form = document.getElementById('deleteQuestion');
    const elementsWithErrors = form.querySelectorAll(':invalid');

    if (elementsWithErrors.length > 0) {
      console.log("Form has errors. Cannot submit.");
      return;
    }

    let data = {
      'question': question.id,
    };
  
      try {
        const response = fetch('http://localhost/Zavrsni rad/deleteQuestion.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(responseData => {
          if (responseData.success) {
            handleClose();
          } else {
            console.log("Deleting question failed");
          }
        });
        
      } catch (error) {
        console.error("ERROR WHILE DELETING QUESTION: ", error);
      }
  }
    
  return (
    <>
      <div className='container-fluid align-items-center justify-content-center' id='modalStyle'>
        <Modal show={show} onHide={handleClose} id='modal-header'>
          <Modal.Header id='modalStyle'>
            <Modal.Title id='text'>Edit category</Modal.Title>
          </Modal.Header>
          <form onSubmit={(e) => { e.preventDefault(); }} id="deleteQuestion">
            <Modal.Body id='modalStyle'>
              <div className='container-fluid d-flex align-items-center justify-content-center'>
                <div className='d-flex flex-column'>
                  <md-filled-select label='Questions' id='questionDeleteSelect' name='questionDeleteSelect' class='mt-2' required>
                    {questions.map((question) => (
                      <md-select-option key={question.id} value={question.questionText}>
                        <div slot="headline">{question.questionText}</div>
                      </md-select-option>
                    ))}
                  </md-filled-select>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer id='modalStyle'>
              <md-filled-tonal-button id='secondaryTonalButton' onClick={handleClose}>Cancel</md-filled-tonal-button>
              <md-filled-button id='errorButton' onClick={handleDeleteQuestion}>Delete</md-filled-button>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
    </>
  );
}

export default DeleteQuestionModal;