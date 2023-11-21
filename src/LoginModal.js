import React from 'react';
import { Modal } from 'react-bootstrap';
import '@material/web/all';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

function LoginModal({ show, handleClose }) {
  return (
    <>
    <div className='container-fluid align-items-center justify-content-center' id='modalStyle'>
      <Modal show={show} onHide={handleClose} id='modal-header'>
        <Modal.Header id='modalStyle'>
            <Modal.Title id='text'>Log in</Modal.Title>
        </Modal.Header>
        <form onSubmit={(event) => {event.preventDefault(); handleClose();}}>
        <Modal.Body id='modalStyle'>
            <div className='container-fluid d-flex align-items-center justify-content-center'>
                <div className='d-flex flex-column'>
                <md-filled-text-field label='Username' type='text' id='textField'></md-filled-text-field>
                    <md-filled-text-field label='E-mail' type='email' id='textField' class='mt-2'></md-filled-text-field>
                    <md-filled-text-field label='Password' type='password' id='textField' class='mt-2'></md-filled-text-field>
                </div>
            </div>
        </Modal.Body>
        <Modal.Footer id='modalStyle'>
            <md-filled-tonal-button id='secondaryTonalButton' onClick={handleClose}>Cancel</md-filled-tonal-button>
            <md-filled-button id='primaryButton' type='submit'>Log in</md-filled-button>
        </Modal.Footer>
        </form>
      </Modal>
    </div>
    </>
  );
}

export default LoginModal;