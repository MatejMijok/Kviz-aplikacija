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
  });

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleRegistration = async () =>{
    try {
      const response = await fetch('http://localhost/Web programiranje projekt/register.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log("Successful registration");
      } else {
        console.log("Registration failed");
      }
    } catch (error) {
      console.error("ERROR WHILE REGISTERING: ", error);
    }

  }
  return (
    <>
    <div className='container-fluid align-items-center justify-content-center' id='modalStyle'>
      <Modal show={show} onHide={handleClose} id='modal-header'>
        <Modal.Header id='modalStyle'>
            <Modal.Title id='text'>Log in</Modal.Title>
        </Modal.Header>
        <Modal.Body id='modalStyle'>
        <form>
            <div className='container-fluid d-flex align-items-center justify-content-center'>
                <div className='d-flex flex-column'>
                    <md-filled-text-field label='Username' type='text' id='textField' name='username' onInput={handleInputChange}></md-filled-text-field>
                    <md-filled-text-field label='E-mail' type='email' id='textField' name='email' class='mt-2' checkValidity onInput={handleInputChange}></md-filled-text-field>
                    <md-filled-text-field label='First name' type='text' id='textField' name='fname' class='mt-2' onInput={handleInputChange}></md-filled-text-field>
                    <md-filled-text-field label='Last name' type='text' id='textField' name='lname' class='mt-2' onInput={handleInputChange}></md-filled-text-field>
                    <md-filled-text-field label='Password' type='password' id='textField' name='password' class='mt-2' onInput={handleInputChange}></md-filled-text-field>
                    <md-filled-text-field label='Repeat password' type='password' id='textField' class='mt-2'></md-filled-text-field>
                </div>
            </div>
            </form>
        </Modal.Body>
        <Modal.Footer id='modalStyle'>
            <md-filled-tonal-button id='secondaryTonalButton' onClick={handleClose}>Cancel</md-filled-tonal-button>
            <md-filled-button id='primaryButton' onClick={() => {handleClose(); handleRegistration()}}>Register</md-filled-button>
        </Modal.Footer>
      </Modal>
    </div>
    </>
  );
}

export default RegisterModal;