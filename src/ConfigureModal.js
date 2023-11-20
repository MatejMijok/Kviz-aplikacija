import React from 'react';
import { Modal } from 'react-bootstrap';
import '@material/web/all';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

function ConfigureModal({ show, handleClose }) {
  return (
    <>
    <div className='container-fluid align-items-center justify-content-center' id='modalStyle'>
      <Modal show={show} onHide={handleClose} id='modal-header  '>
        <Modal.Header id='modalStyle'>
          <Modal.Title id='text'>Configuration</Modal.Title>
        </Modal.Header>
        <Modal.Body id='modalStyle'>
          <p id='text'>nesto napisano</p>
        </Modal.Body>

        <Modal.Footer id='modalStyle'>
          <md-filled-tonal-button id='secondaryTonalButton' onClick={handleClose}>Cancel</md-filled-tonal-button>
          <md-filled-button id='primaryButton'>Save</md-filled-button>
        </Modal.Footer>
      </Modal>
    </div>
    </>
  );
}

export default ConfigureModal;