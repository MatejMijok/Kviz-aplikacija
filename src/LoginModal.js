import React , { useState }from 'react';
import { Modal } from 'react-bootstrap';
import '@material/web/all';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

function LoginModal({ show, handleClose }) {

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    username: undefined,
    password: undefined,
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
  }
  
  setErrors((prevErrors) => ({
    ...prevErrors,
    [name]: isEmpty ? `${name} cannot be empty` : undefined,
  }));
  };

  const handleLogin = () => {
    const form = document.getElementById('loginForm');
    const elementsWithErrors = form.querySelectorAll(':invalid');

    if (elementsWithErrors.length > 0) {
      console.log("Form has errors. Cannot submit.");
      return;
    }

    try {
      const response = fetch('http://localhost/Web programiranje projekt/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      .then(_response => response.json())
      .then(responseData => {
        if (responseData.success) {
          console.log("Successful login");
          console.log(responseData);
          handleClose();
        } else {
          console.log(responseData.message);
        }
      });

    } catch (error) {
      console.error("ERROR WHILE LOGGING IN: ", error);
    }

  }

  return (
    <>
    <div className='container-fluid align-items-center justify-content-center' id='modalStyle'>
      <Modal show={show} onHide={handleClose} id='modal-header'>
        <Modal.Header id='modalStyle'>
            <Modal.Title id='text'>Log in</Modal.Title>
        </Modal.Header>
        <form onSubmit={(e) => {e.preventDefault();}} id='loginForm'>
        <Modal.Body id='modalStyle'>
            <div className='container-fluid d-flex align-items-center justify-content-center'>
                <div className='d-flex flex-column'>
                    <md-filled-text-field label='Username' type='text' id='textField' name='username' onInput={handleInputChange} onBlur={ (e) => {checkEmpty(e);}} error={errors.username} required></md-filled-text-field>
                    <md-filled-text-field label='Password' type='password' id='textField' name='password' class='mt-2' onInput={handleInputChange} onBlur={ (e) => {checkEmpty(e);}} error={errors.password} required></md-filled-text-field>
                </div>
            </div>
        </Modal.Body>
        <Modal.Footer id='modalStyle'>
            <md-filled-tonal-button id='secondaryTonalButton' onClick={handleClose}>Cancel</md-filled-tonal-button>
            <md-filled-button id='primaryButton' type='submit' onClick={ () => {handleLogin(); handleClose();}}>Log in</md-filled-button>
        </Modal.Footer> 
        </form>
      </Modal>
    </div>
    </>
  );
}

export default LoginModal;