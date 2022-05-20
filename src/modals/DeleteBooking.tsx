import React, { EventHandler, useState } from 'react';
import Booking from '../dataModels/Booking'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import APIService from '../services/apiService';
import { resolveModuleNameFromCache } from 'typescript';

type dpProps = {
    confirmationNumber: number
}

function DeleteBooking(props: dpProps) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    function DoubleAction() {
        APIService.deleteBooking(props.confirmationNumber);
        handleClose();
    }
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Delete Booking
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure that you would like to delete this Booking?
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


export default DeleteBooking;
