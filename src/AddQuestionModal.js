/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import '@material/web/all';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

function AddQuestionModal({ show, handleClose }) {
  const [formData, setFormData] = useState({
    questionText: '',
    answerOne: '',
    answerTwo: '',
    answerThree: '',
    correctAnswer: '',
    category: '', 
  });

  const [errors, setErrors] = useState({
    questionText: '',
    answerOne: '',
    answerTwo: '',
    answerThree: '',
    correctAnswer: '',
    category: '', 
  });

  const [categories, setCategories] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const checkEmpty = (e) => {
    const { name, value, label } = e.target;
    const isEmpty = value.trim() === '';

    if (isEmpty) {
      e.target.setCustomValidity(`${label} cannot be empty`);
    } else {
      e.target.setCustomValidity('');
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: isEmpty ? `${name} cannot be empty` : undefined,
    }));
  };

  const handleSelectChange = (e) => {
    const selectedIndex = e.target.selectedIndex;
    const selectedCategory = categories[selectedIndex];
    setFormData({ ...formData, category: selectedCategory.id });
  };
  
  useEffect(() => {
    const selectElement = document.querySelector('#categorySelect');
    if (selectElement) {
      selectElement.addEventListener('change', handleSelectChange);
    }
    return () => {
      if (selectElement) {
        selectElement.removeEventListener('change', handleSelectChange);
      }
    };
  });

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost/Web programiranje projekt/fetchCategories.php');
      const data = await response.json();
      console.log(data);
      return data.categories;
    } catch {
      console.error('Error fetching categories');
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const fetchedCategories = await fetchCategories();
      setCategories(fetchedCategories);
    };
    fetchData();
  }, []); 

  const handleQuestion = () =>{
    const form = document.getElementById('addQuestionForm');
    const elementsWithErrors = form.querySelectorAll(':invalid');

    if (elementsWithErrors.length > 0) {
      console.log("Form has errors. Cannot submit.");
      return;
    }
    try {
        const response = fetch('http://localhost/Web programiranje projekt/addQuestion.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(responseData => {
          if (responseData.success) {
            console.log("Success adding question");
            handleClose();
          } else {
            console.log("Failure adding question");
          }
        });
        
      } catch (error) {
        console.error("ERROR WHILE ADDING QUESTION: ", error);
      } 
  }

  return (
    <>
      <div className='container-fluid align-items-center justify-content-center' id='modalStyle'>
        <Modal show={show} onHide={handleClose} id='modal-header'>
          <Modal.Header id='modalStyle'>
            <Modal.Title id='text'>Add a new question</Modal.Title>
          </Modal.Header>
          <form onSubmit={(e) => { e.preventDefault(); }} id="addQuestionForm">
            <Modal.Body id='modalStyle'>
              <div className='container-fluid d-flex align-items-center justify-content-center'>
                <div className='d-flex flex-column'>
                  <md-filled-text-field label='Question' type='textarea' id='textField' name='questionText' onInput={handleInputChange} onBlur={(e) => { checkEmpty(e); }} error={errors.questionText} required></md-filled-text-field>
                  <md-filled-text-field label='First answer' type='text' id='textField' name='answerOne' class='mt-2' onInput={handleInputChange} onBlur={(e) => { checkEmpty(e); }} error={errors.answerOne} required></md-filled-text-field>
                  <md-filled-text-field label='Second answer' type='text' id='textField' name='answerTwo' class='mt-2' onInput={handleInputChange} onBlur={(e) => { checkEmpty(e); }} error={errors.answerTwo} required></md-filled-text-field>
                  <md-filled-text-field label='Third answer' type='text' id='textField' name='answerThree' class='mt-2' onInput={handleInputChange} onBlur={(e) => { checkEmpty(e); }} error={errors.answerThree} required></md-filled-text-field>
                  <md-filled-text-field label='Correct Answer' type='text' id='textField' name='correctAnswer' class='mt-2' onInput={handleInputChange} onBlur={(e) => { checkEmpty(e); }} error={errors.correctAnswer} required></md-filled-text-field>
                  <md-filled-select label='Categories' id='categorySelect' name='categorySelect' class='mt-2' required>
                    {categories.map((category) => (
                      <md-select-option key={category.id} value={category.category}>
                        <div slot="headline">{category.category}</div>
                      </md-select-option>
                    ))}
                  </md-filled-select>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer id='modalStyle'>
              <md-filled-tonal-button id='secondaryTonalButton' onClick={handleClose}>Cancel</md-filled-tonal-button>
              <md-filled-button id='primaryButton' onClick={handleQuestion}>Save</md-filled-button>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
    </>
  );
}

export default AddQuestionModal;
