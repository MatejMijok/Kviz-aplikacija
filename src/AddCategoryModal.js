/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import '@material/web/all';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

function AddCategoryModal({ show, handleClose }) {
  const [formData, setFormData] = useState({
    categoryName: '',
  });

  const [errors, setErrors] = useState({
    categoryName: undefined,
  });

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const checkEmpty = async (e) => {
    const { name, value } = e.target;
    const isEmpty = value.trim() === '';
    
    if (isEmpty) {
      e.target.setCustomValidity(`${name} cannot be empty`);
    } else {
      e.target.setCustomValidity('');
      if (name === 'categoryName') {
        const response = await checkCategoryAvailability(value);
        if (!response.success) {
          e.target.setCustomValidity(response.error);
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: response.error,
          }));
          console.log(response.error)
        }
      }
    }
    
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: isEmpty ? `${name} cannot be empty` : undefined,
    }));
  };

  const checkCategoryAvailability = async (categoryName) => {
    try {
      const response = await fetch('http://localhost/Zavrsni rad/checkCategory.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ categoryName }),
      });
      return await response.json();
    } catch (error) {
      console.error("Error while checking category availability: ", error);
      return { success: false, error: "Error checking category availability" };
    }
  };

  const handleCategory = () =>{
  const form = document.getElementById('categoryForm');
  const elementsWithErrors = form.querySelectorAll(':invalid');

  if (elementsWithErrors.length > 0) {
    console.log("Form has errors. Cannot submit.");
    return;
  }
    try {
      const response = fetch('http://localhost/Zavrsni rad/addCategory.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      .then(response => response.json())
      .then(responseData => {
        if (responseData.success) {
          handleClose();
        } else {
          console.log("Adding category failed");
        }
      });
      
    } catch (error) {
      console.error("ERROR WHILE ADDING CATEGORY: ", error);
    }
  }

  return (
    <>
    <div className='container-fluid align-items-center justify-content-center' id='modalStyle'>
      <Modal show={show} onHide={handleClose} id='modal-header'>
        <Modal.Header id='modalStyle'>
            <Modal.Title id='text'>Log in</Modal.Title>
        </Modal.Header>
        <form onSubmit={ (e) => {e.preventDefault();}} id="categoryForm">
        <Modal.Body id='modalStyle'>
          <div className='container-fluid d-flex align-items-center justify-content-center'>
            <div className='d-flex flex-column'>
              <md-filled-text-field label='Category name' type='text' id='textField' name='categoryName' onInput={handleInputChange} onBlur={ (e) => {checkEmpty(e);}} error={errors.categoryName} required></md-filled-text-field>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer id='modalStyle'>
            <md-filled-tonal-button id='secondaryTonalButton' onClick={ () => {handleClose();}}>Cancel</md-filled-tonal-button>
            <md-filled-button id='primaryButton' onClick={() => {handleCategory();}}>Confirm</md-filled-button>
        </Modal.Footer>
        </form>
      </Modal>
    </div>
    </>
  );
}

export default AddCategoryModal;