import React, { EventHandler, useState } from 'react';
import Flight from '../dataModels/Flight';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import APIService from '../services/apiService';
import { resolveModuleNameFromCache } from 'typescript';

type dpProps = {
    number: number
}

function DeleteFlight(props: dpProps) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    function DoubleAction() {
        APIService.deleteFlight(props.number);
        handleClose();
    }
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Delete Flight
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure that you would like to delete this Flight?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={DoubleAction}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default DeleteFlight;
