import React, { EventHandler, useState } from 'react';
import Passenger, {AddPassengerDTO} from '../dataModels/Passenger'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import APIService from '../services/apiService';
import { resolveModuleNameFromCache } from 'typescript';

type dpProps = {
    idin: number
}

function DeletePassenger(props: dpProps) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    function DoubleAction() {
        APIService.deletePassenger(props.idin);
        window.location.reload();
        handleClose();
    }
    return (
      <>
        <Button className="color-button" onClick={handleShow}>
          Delete Passenger
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure that you would like to delete this Passenger?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button className="color-button" onClick={DoubleAction}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}


export default DeletePassenger;
