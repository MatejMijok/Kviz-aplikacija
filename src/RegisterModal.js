/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import '@material/web/all';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

function RegisterModal({ show, handleClose }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    fname: '',
    lname: '',
    password: '',
    repeatPassword: '',
  });

  const [errors, setErrors] = useState({
    username: undefined,
    email: undefined,
    fname: undefined,
    lname: undefined,
    password: undefined,
    repeatPassword: undefined,
  });

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const checkPasswordMatch = (e) => {
    const repeatPasswordField = e.target.form['repeatPassword'];
    if (formData.password !== formData.repeatPassword) {
      repeatPasswordField.setCustomValidity('Passwords do not match');
      setErrors((prevErrors) => ({
        ...prevErrors,
        repeatPassword: 'Passwords do not match',
      }));
    } else {
      repeatPasswordField.setCustomValidity('');
      setErrors((prevErrors) => ({
        ...prevErrors,
        repeatPassword: undefined,
      }));
    }
  };

  const checkEmpty = async (e) => {
    const { name, value } = e.target;
    const isEmpty = value.trim() === '';
    
    if (isEmpty) {
      e.target.setCustomValidity(`${name} cannot be empty`);
    } else {
      e.target.setCustomValidity('');
      if (name === 'username') {
        const response = await checkUsernameAvailability(value);
        if (!response.success) {
          e.target.setCustomValidity(response.error);
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: response.error,
          }));
        }
      }
    }
    
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: isEmpty ? `${name} cannot be empty` : undefined,
    }));
  };

  const checkUsernameAvailability = async (username) => {
    try {
      const response = await fetch('http://localhost/Zavrsni rad/checkUsername.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });
      
      return await response.json();
    } catch (error) {
      console.error("Error while checking username availability: ", error);
      return { success: false, error: "Error checking username availability" };
    }
  };

  const handleRegistration = () =>{
    const form = document.getElementById('registerForm');
    const elementsWithErrors = form.querySelectorAll(':invalid');

    if (elementsWithErrors.length > 0) {
      console.log("Form has errors. Cannot submit.");
      return;
    }
      try {
        const response = fetch('http://localhost/Zavrsni rad/register.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(responseData => {
          if (responseData.success) {
            console.log("Successful registration");
            localStorage.setItem('sessionData', JSON.stringify(responseData.data));
            handleClose();
          } else {
            console.log("Registration failed");
          }
        });
        
      } catch (error) {
        console.error("ERROR WHILE REGISTERING: ", error);
      }
  }

  return (
    <>
    <div className='container-fluid align-items-center justify-content-center' id='modalStyle'>
      <Modal show={show} onHide={handleClose} id='modal-header'>
        <Modal.Header id='modalStyle'>
            <Modal.Title id='text'>Register</Modal.Title>
        </Modal.Header>
        <form onSubmit={ (e) => {e.preventDefault();}} id="registerForm">
        <Modal.Body id='modalStyle'>
          <div className='container-fluid d-flex align-items-center justify-content-center'>
            <div className='d-flex flex-column'>
              <md-filled-text-field label='Username' type='text' id='textField' name='username' onInput={handleInputChange} onBlur={ (e) => {checkEmpty(e);}} error={errors.username} required></md-filled-text-field>
              <md-filled-text-field label='E-mail' type='email' id='textField' name='email' class='mt-2' checkValidity onInput={handleInputChange} onBlur={ (e) => {checkEmpty(e);}} error={errors.email} required ></md-filled-text-field>
              <md-filled-text-field label='First name' type='text' id='textField' name='fname' class='mt-2' onInput={handleInputChange} onBlur={ (e) => {checkEmpty(e);}} error={errors.fname} required></md-filled-text-field>
              <md-filled-text-field label='Last name' type='text' id='textField' name='lname' class='mt-2' onInput={handleInputChange} onBlur={ (e) => {checkEmpty(e);}} error={errors.lname} required></md-filled-text-field>
              <md-filled-text-field label='Password' type='password' id='textField' name='password' class='mt-2' onInput={handleInputChange} onBlur={ (e) => {checkEmpty(e); checkPasswordMatch(e);}} error={errors.password} required></md-filled-text-field>
              <md-filled-text-field label='Repeat password' type='password' id='textField' name='repeatPassword' class='mt-2' onInput={handleInputChange} onBlur={ (e) => {checkEmpty(e); checkPasswordMatch(e);}} error={errors.repeatPassword} required></md-filled-text-field>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer id='modalStyle'>
            <md-filled-tonal-button id='secondaryTonalButton' onClick={ () => {handleClose();}}>Cancel</md-filled-tonal-button>
            <md-filled-button id='primaryButton' onClick={() => {handleRegistration();}}>Register</md-filled-button>
        </Modal.Footer>
        </form>
      </Modal>
    </div>
    </>
  );
}

export default RegisterModal;