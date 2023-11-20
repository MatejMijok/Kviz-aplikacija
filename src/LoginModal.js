import React from 'react';
import { Modal } from 'react-bootstrap';
import '@material/web/all';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

function LoginModal({ show, handleClose }) {
  return (
    <>
    <div className='container-fluid align-items-center justify-content-center' id='modalStyle'>
      <Modal show={show} onHide={handleClose} id='modal-header  '>
        <Modal.Header id='modalStyle'>
          <Modal.Title id='text'>Log in</Modal.Title>
        </Modal.Header>
        <Modal.Body id='modalStyle'>
          <md-filled-text-field label='E-mail' type='email' id='textField'></md-filled-text-field>
          <md-filled-text-field label='Password' type='password' id='textField'></md-filled-text-field>
        </Modal.Body>

        <Modal.Footer id='modalStyle'>
          <md-filled-tonal-button id='secondaryTonalButton' onClick={handleClose}>Cancel</md-filled-tonal-button>
          <md-filled-button id='primaryButton' type='submit'>Log in</md-filled-button>
        </Modal.Footer>
      </Modal>
    </div>
    </>
  );
}

export default LoginModal;