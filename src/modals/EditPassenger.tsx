import React, { EventHandler, useState } from 'react';
import Passenger, {AddPassengerDTO} from '../dataModels/Passenger'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import APIService from '../services/apiService';
import { resolveModuleNameFromCache } from 'typescript';



type EditPassengerProps = {
    Passenger: Passenger
}

type EditPassengerState = {
    id: number,
    firstName : string,
    lastName : string,
    job : string,
    email : string,
    age : number,
    show : boolean
}

class EditPassenger extends React.Component<EditPassengerProps, EditPassengerState> {

    constructor(props: EditPassengerProps) {
        super(props);
        this.state = {
            id: this.props.Passenger.id,
            firstName : this.props.Passenger.firstName,
            lastName : this.props.Passenger.lastName,
            job : this.props.Passenger.job,
            email : this.props.Passenger.email,
            age : this.props.Passenger.age,
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
        let pass: Passenger = {
            id: this.state.id,
            firstName :this.state.firstName, 
            lastName : this.state.lastName, 
            job : this.state.job, 
            email : this.state.email, 
            age : this.state.age};
        APIService.updatePassenger(pass);
        this.handleClose();
    }
    render() {
        return (
            <>
                <Button variant="primary" onClick={this.handleShow}>
                Edit Passenger
                </Button>
        
                <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Existing Passenger</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group className="mb-3" controlId="firstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="firstName" name="firstName" onChange={this.onFirstNameChanged} value={this.state.firstName} placeholder="Enter First Name" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="lastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="lastName" name="lastName" onChange={this.onLastNameChanged} value={this.state.lastName} placeholder="Enter Last Name" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="job">
                            <Form.Label>Job</Form.Label>
                            <Form.Control type="job" name="job" onChange={this.onJobChanged} value={this.state.job} placeholder="Enter Job" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" onChange={this.onEmailChanged} value={this.state.email} placeholder="name@example.com" />
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
                        <Button variant="primary" type="submit">
                        Save Changes
                        </Button>
                    </Form>
                </Modal.Body>
                </Modal>
            </>
            )
    }
  }



export default EditPassenger