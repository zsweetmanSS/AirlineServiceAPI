import React, { EventHandler, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import APIService from '../services/apiService';
import { resolveModuleNameFromCache } from 'typescript';
import Passenger from '../dataModels/Passenger';
import Flight from '../dataModels/Flight';
import PassengerView from '../views/PassengerView';
import Booking from '../dataModels/Booking';

type AddBookingProps = {
    PassengerList: Passenger[],
    FlightList: Flight[]
    
}

type AddBookingState = {
    passenger?: Passenger,
    flight?: Flight,
    passengerId: number,
    flightNumber: number,
    show: boolean
}


class AddBooking extends React.Component<AddBookingProps, AddBookingState> {

    constructor(props: AddBookingProps) {
        super(props);
        this.state = {
            passenger : props.PassengerList[0],
            flight : props.FlightList[0],
            passengerId : -1,
            flightNumber : -1,
            show : false
        };
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.onFlightNumberChanged = this.onFlightNumberChanged.bind(this);
        this.onPassengerIdChanged = this.onPassengerIdChanged.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleClose() {
        this.setState({show : false});
    }
    handleShow() {
        this.setState({show : true});
    }
    
    onFlightNumberChanged(event: React.ChangeEvent<HTMLSelectElement>) {
        this.setState({flightNumber : event.target.value as unknown as number})
        for (let index = 0; index < this.props.FlightList.length; index++) {
            if(this.props.FlightList[index].number == event.target.value as unknown as number) {
                this.setState({flight : this.props.FlightList[index]});
            }
        };
    }
    onPassengerIdChanged(event: React.ChangeEvent<HTMLSelectElement>) {
        this.setState({passengerId : event.target.value as unknown as number})
        for (let index = 0; index < this.props.PassengerList.length; index++) {
            if(this.props.PassengerList[index].id == event.target.value as unknown as number) {
                this.setState({passenger : this.props.PassengerList[index]});
            }
        };
    }

    handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
        //let id: number = 7;
        event.preventDefault();
        APIService.createNewBooking(this.state.flight as Flight, this.state.passenger as Passenger)
        // .then(response => {
        //         window.alert(response.data);
        // });
        window.location.reload();
        this.handleClose();
    }
    render() {
        return (
            <>
                <Button className="color-button" onClick={this.handleShow}>
                Add New Booking
                </Button>
        
                <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Booking</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="formBasicSelect">
                            <Form.Label>Select Passenger</Form.Label>
                            <Form.Select onChange={this.onPassengerIdChanged} defaultValue={this.state.passengerId}>
                                <option>Please Select Passenger</option>
                               {/* <option value={this.state.passengerId}>{this.state.passenger.firstName} {this.state.passenger.lastName}</option> */}
                                {this.props.PassengerList.map( (Passenger: Passenger) => (
                                <React.Fragment key={Passenger.id}>
                                    <option value={Passenger.id}>{Passenger.firstName} {Passenger.lastName}</option>
                                </React.Fragment>
                                ))}
                            </Form.Select>
                            
                        </Form.Group>
                        <Form.Group controlId="formBasicSelect">
                            <Form.Label>Select Flight
                                {/* Details:
                                Departure
                                {this.state.flight.departureAirport}
                                {this.state.flight.departureDate.substring(0,10)}
                                {this.state.flight.departureDate.substring(11,19)}
                                Arrival
                                {this.state.flight.arrivalAirport}
                                {this.state.flight.arrivalDate.substring(0,10)}
                                {this.state.flight.arrivalDate.substring(11,19)} */}
                            </Form.Label>                        
                            <Form.Select onChange={this.onFlightNumberChanged} defaultValue={this.state.flightNumber}>
                                {/* <option value={this.state.flightNumber}>{this.state.flight.departureAirport.name} to {this.state.flight.arrivalAirport.name}</option> */}
                                <option>Please Select Flight</option>
                                {this.props.FlightList.map( (Flight: Flight) => (
                                <React.Fragment key={Flight.number}>
                                    <option value={Flight.number}>{Flight.departureAirport.name} to {Flight.arrivalAirport.name}</option>
                                </React.Fragment>
                                ))};
                            </Form.Select>
                            
                            {/* <div>
                                <>
                                <h5>Departure</h5>
                                City: {this.state.flight.departureAirport.name}
                                <br/>
                                Date: {this.state.flight.departureDate.substring(0,10)}
                                <br/>
                                Time: {this.state.flight.departureDate.substring(11,19)}
                                <br/>
                                <h5>Arrival</h5>
                                City: {this.state.flight.arrivalAirport.name ? 'hello'}
                                <br/>
                                Date: {this.state.flight.arrivalDate.substring(0,10)}
                                <br/>
                                Time: {this.state.flight.arrivalDate.substring(11,19)}
                                </>
                            </div> */}
                            
                            
                        </Form.Group>
                        
                        <Button variant="secondary" onClick={this.handleClose}>
                        Close
                        </Button>
                        <Button className="color-button" type="submit">
                        Save Changes
                        </Button>
                    </Form>
                </Modal.Body>
                </Modal>
            </>
            )
    }
  }

  export default AddBooking;