/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import '@material/web/all';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

function ChangeUsernameModal({ show, handleClose }) {
  const sessionData = JSON.parse(localStorage.getItem("sessionData"));
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    fname: '',
    lname: '',
  });

  const [errors, setErrors] = useState({
    username: undefined,
    email: undefined,
    fname: undefined,
    lname: undefined,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const checkEmpty = async (e) => {
    const { name, value } = e.target;
    const isEmpty = value.trim() === '';
    
    if (isEmpty) {
      e.target.setCustomValidity(`${name} cannot be empty`);
    } else {
      e.target.setCustomValidity('');
      if (name === 'newUsername') {
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
      const response = await fetch('http://localhost/Web programiranje projekt/checkUsername.php', {
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

  const handleChangeUsername = () => {
    const form = document.getElementById('changeUsername');
    const elementsWithErrors = form.querySelectorAll(':invalid');

    if (elementsWithErrors.length > 0) {
      console.log("Form has errors. Cannot submit.");
      return;
    }
      try {
        let data = {
            "user": sessionData,
            "newData": formData,
        }
        const response = fetch('http://localhost/Web programiranje projekt/updateUserData.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(responseData => {
          if (responseData.success) {
            console.log("Successful change");
            sessionData.username = formData.username;
            sessionData.email = formData.email;
            sessionData.fname = formData.fname;
            sessionData.lname = formData.lname;
            localStorage.setItem('sessionData', JSON.stringify(sessionData));
            handleClose();
          } else {
            console.log("Change failed");
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
            <Modal.Title id='text'>Edit profile</Modal.Title>
          </Modal.Header>
          <form onSubmit={(e) => { e.preventDefault(); }} id="changeUsername">
            <Modal.Body id='modalStyle'>
              <div className='container-fluid d-flex align-items-center justify-content-center'>
                <div className='d-flex flex-column'>
                  <md-filled-text-field class="mt-2" value={sessionData.username} label='Username' type='text' id='textField' name='username' onInput={handleInputChange} onBlur={(e) => { checkEmpty(e); }} error={errors.username} required></md-filled-text-field>
                  <md-filled-text-field class="mt-2" value={sessionData.fname} label='First name' type='text' id='textField' name='fname' onInput={handleInputChange} onBlur={(e) => { checkEmpty(e); }} error={errors.fname} required></md-filled-text-field>
                  <md-filled-text-field class="mt-2" value={sessionData.lname} label='Last Name' type='text' id='textField' name='lname' onInput={handleInputChange} onBlur={(e) => { checkEmpty(e); }} error={errors.lname} required></md-filled-text-field>
                  <md-filled-text-field class="mt-2" value={sessionData.email} label='E-mail' type='email' id='textField' name='email' onInput={handleInputChange} onBlur={(e) => { checkEmpty(e); }} error={errors.email} required></md-filled-text-field>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer id='modalStyle'>
              <md-filled-tonal-button id='secondaryTonalButton' onClick={handleClose}>Cancel</md-filled-tonal-button>
              <md-filled-button id='primaryButton' onClick={handleChangeUsername}>Save</md-filled-button>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
    </>
  );
}

export default ChangeUsernameModal;