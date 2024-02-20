/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import '@material/web/all';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

function ConfigureModal({ show, handleClose }) {
  const [category, setCategory] = useState();

  const [categories, setCategories] = useState([]);

  const [numberOfQuestions, setNumberOfQuestions] = useState(5);

  const [errors, setErrors] = useState({
    numberOfQuestions: undefined,
  });

  const handleSelectChange = (e) => {
    const selectedIndex = e.target.selectedIndex;
    const selectedCategory = categories[selectedIndex];
    setCategory(selectedCategory);
    console.log(selectedCategory);
  };
  
  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setNumberOfQuestions({ ...numberOfQuestions, [name]: value });
    console.log(numberOfQuestions)
  }

  const checkIsNumber = (e) => {
    const numberField = e.target.form['numberOfQuestions'];
    if(Number.isInteger(parseInt(numberField.value))){
      numberField.setCustomValidity('');
      setErrors((prevErrors) => ({
        ...prevErrors,
        numberOfQuestions: undefined,
      }));
    }else{
      numberField.setCustomValidity('The input is not a number!');
      setErrors((prevErrors) => ({
        ...prevErrors,
        numberOfQuestions: 'The input is not a number',
      }));
    }
  }

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
    if(show){
      fetchData();
    }
  }, [show]); 

  const handleConfig = () => {
    const form = document.getElementById('configForm');
    const elementsWithErrors = form.querySelectorAll(':invalid');

    if (elementsWithErrors.length > 0) {
      console.log("Form has errors. Cannot submit.");
      return;
    }

    localStorage.setItem("category", JSON.stringify(category));
    localStorage.setItem("numberOfQuestions", JSON.stringify(numberOfQuestions));
    handleClose();
  }

  return (
    <>
      <div className='container-fluid align-items-center justify-content-center' id='modalStyle'>
        <Modal show={show} onHide={handleClose} id='modal-header'>
          <Modal.Header id='modalStyle'>
            <Modal.Title id='text'>Configure the quiz</Modal.Title>
          </Modal.Header>
          <form onSubmit={(e) => { e.preventDefault(); }} id="configForm">
            <Modal.Body id='modalStyle'>
              <div className='container-fluid d-flex align-items-center justify-content-center'>
                <div className='d-flex flex-column'>
                  <md-filled-select label='Categories' id='categorySelect' name='categorySelect' class='mt-2' required>
                    {categories.map((category) => (
                      <md-select-option key={category.id} value={category.category}>
                        <div slot="headline">{category.category}</div>
                      </md-select-option>
                    ))}
                  </md-filled-select>
                  <md-filled-text-field value="5" label="Number of questions" type='number' id='textField' name='numberOfQuestions' class="mt-2" onInput={handleInputChange} onBlur={ (e) => {checkIsNumber(e);}} error={errors.numberOfQuestions}></md-filled-text-field>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer id='modalStyle'>
              <md-filled-tonal-button id='secondaryTonalButton' onClick={handleClose}>Cancel</md-filled-tonal-button>
              <md-filled-button id='primaryButton' onClick={handleConfig}>Save</md-filled-button>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
    </>
  );
}

export default ConfigureModal;