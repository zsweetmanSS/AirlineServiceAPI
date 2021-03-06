import React, { EventHandler, useState } from 'react';
import Passenger, {AddPassengerDTO} from '../dataModels/Passenger'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import APIService from '../services/apiService';
import { resolveModuleNameFromCache } from 'typescript';
import '../style/styleGuide.css';

type AddPassengerProps = {
    
}
type AddPassengerState = {
    firstName : string,
    lastName : string,
    job : string,
    email : string,
    age : number,
    show : boolean
}

class AddPassenger extends React.Component<AddPassengerProps, AddPassengerState> {

    constructor(props: AddPassengerProps) {
        super(props);
        this.state = {
            firstName : "",
            lastName : "",
            job : "",
            email : "",
            age : 0,
            show : false
        };
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.onFirstNameChanged = this.onFirstNameChanged.bind(this);
        this.onLastNameChanged = this.onLastNameChanged.bind(this);
        this.onJobChanged = this.onJobChanged.bind(this);
        this.onEmailChanged = this.onEmailChanged.bind(this);
        this.onAgeChanged = this.onAgeChanged.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleClose() {
        this.setState({show : false});
    }
    handleShow() {
        this.setState({show : true});
    }
    
    onFirstNameChanged(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({firstName : event.target.value})
    }
    onLastNameChanged(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({lastName : event.target.value})
    }
    onJobChanged(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({job : event.target.value})
    }
    onEmailChanged(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({email : event.target.value})
    }
    onAgeChanged(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({age : event.target.value as unknown as number})
    }

    handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
        //let id: number = 7;
        event.preventDefault();
        let pass: AddPassengerDTO = {
            firstName :this.state.firstName, 
            lastName : this.state.lastName, 
            job : this.state.job, 
            email : this.state.email, 
            age : this.state.age};
        APIService.createPassenger(pass);
        window.location.reload();
        this.handleClose();
    }
    render() {
        return (
            <>
                <Button className="color-button" onClick={this.handleShow}>
                Add New Passenger
                </Button>
        
                <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Passenger</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group className="mb-3" controlId="firstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control required type="firstName" name="firstName" onChange={this.onFirstNameChanged} value={this.state.firstName} placeholder="Enter First Name" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="lastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control required type="lastName" name="lastName" onChange={this.onLastNameChanged} value={this.state.lastName} placeholder="Enter Last Name" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="job">
                            <Form.Label>Job</Form.Label>
                            <Form.Control type="job" name="job" onChange={this.onJobChanged} value={this.state.job} placeholder="Enter Job" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control required type="email" name="email" onChange={this.onEmailChanged} value={this.state.email} placeholder="name@example.com" />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text> 
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="age">
                            <Form.Label>Age</Form.Label>
                            <Form.Control type="age" name="age" onChange={this.onAgeChanged} value={this.state.age} placeholder="Add Age as Number" />
                        </Form.Group>
                        {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group> */}
                        <Button variant="secondary" onClick={this.handleClose}>
                        Close
                        </Button>
                        <Button className="color-button" type="submit">
                        Submit
                        </Button>
                    </Form>
                </Modal.Body>
                </Modal>
            </>
            )
    }
  }

  export default AddPassenger;