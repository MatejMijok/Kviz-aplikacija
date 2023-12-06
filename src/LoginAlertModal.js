/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import '@material/web/all';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

function LoginAlertModal({ show, handleClose }) {
  return (
    <>
      <div className='container-fluid align-items-center justify-content-center' id='modalStyle'>
        <Modal show={show} onHide={handleClose} id='modal-header'>
          <Modal.Header id='modalStyle'>
            <Modal.Title id='text'>Configure the quiz</Modal.Title>
          </Modal.Header>
            <Modal.Body id='modalStyle'>
              <div className='container-fluid d-flex align-items-center justify-content-center'>
                <p className="lead text-center" id="text">You need to create an account to play!</p>
              </div>
            </Modal.Body>
            <Modal.Footer id='modalStyle'>
              <md-filled-tonal-button id='secondaryTonalButton' onClick={handleClose}>Ok</md-filled-tonal-button>
            </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default LoginAlertModal;