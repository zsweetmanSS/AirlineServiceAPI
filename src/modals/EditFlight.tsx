import React, { EventHandler, useState } from 'react';
import Passenger, {AddPassengerDTO} from '../dataModels/Passenger'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import APIService from '../services/apiService';
import { resolveModuleNameFromCache } from 'typescript';
import Airport from '../dataModels/Airport';
import Flight from '../dataModels/Flight';
//import DatePicker from 'react-bootstrap-datetimepicker';
import "react-datepicker/dist/react-datepicker.css";



type EditFlightProps = {
    Flight: Flight,
    airportList: Airport[]
}

type EditFlightState = {
    number: number,
    departureDay: string,
    departureTime: string,
    arrivalDay: string,
    arrivalTime: string,
    maxCapacity: number,
    arrivalAirport: Airport,
    departureAirport: Airport,
    show : boolean
}

class EditFlight extends React.Component<EditFlightProps, EditFlightState> {

    constructor(props: EditFlightProps) {
        super(props);
        this.state = {
            number: this.props.Flight.number,
            departureDay: this.props.Flight.departureDate.substring(0,10),
            departureTime: this.props.Flight.departureDate.substring(11,19),
            arrivalDay: this.props.Flight.arrivalDate.substring(0,10),
            arrivalTime: this.props.Flight.arrivalDate.substring(11,19),
            maxCapacity : this.props.Flight.maxCapacity,
            arrivalAirport : this.props.Flight.arrivalAirport,
            departureAirport : this.props.Flight.departureAirport,
            show : false
        };
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.onDepartureDayChanged = this.onDepartureDayChanged.bind(this);
        this.onDepartureTimeChanged = this.onDepartureTimeChanged.bind(this);
        this.onArrivalDayChanged = this.onArrivalDayChanged.bind(this);
        this.onArrivalTimeChanged = this.onArrivalTimeChanged.bind(this);
        this.onMaxCapacityChanged = this.onMaxCapacityChanged.bind(this);
        this.onDepartureAirportChanged = this.onDepartureAirportChanged.bind(this);
        this.onArrivalAirportChanged = this.onArrivalAirportChanged.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleClose() {
        this.setState({show : false});
    }
    handleShow() {
        this.setState({show : true});
    }
    
    onDepartureDayChanged(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({departureDay : event.target.value})
    }
    onDepartureTimeChanged(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({departureTime : event.target.value})
    }
    onArrivalDayChanged(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({arrivalDay : event.target.value})
    }
    onArrivalTimeChanged(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({arrivalTime : event.target.value})
    }
    onMaxCapacityChanged(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({maxCapacity : event.target.value as unknown as number})
    }
    onDepartureAirportChanged(event: React.ChangeEvent<HTMLSelectElement>) {
        for (let index = 0; index < this.props.airportList.length; index++) {
            if(this.props.airportList[index].id == event.target.value as unknown as number) {
                this.setState({departureAirport : this.props.airportList[index]});
            }
        };
    }
    onArrivalAirportChanged(event: React.ChangeEvent<HTMLSelectElement>) {
        for (let index = 0; index < this.props.airportList.length; index++) {
            if(this.props.airportList[index].id == event.target.value as unknown as number) {
                this.setState({arrivalAirport : this.props.airportList[index]});
            }
        };
    }
    handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
        //let id: number = 7;
        event.preventDefault();
        let changedFlight: Flight = {
            number: this.state.number,
            departureDate: `${this.state.departureDay}T${this.state.departureTime}.000Z`,
            arrivalDate: `${this.state.arrivalDay}T${this.state.arrivalTime}.000Z`,
            maxCapacity : this.state.maxCapacity,
            arrivalAirport : this.state.arrivalAirport,
            departureAirport : this.state.departureAirport,
        }
        APIService.updateFlight(changedFlight);
        this.handleClose();
    }
    render() {
        return (
            <>
                <Button variant="primary" onClick={this.handleShow}>
                Edit Flight
                </Button>
        
                <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Existing Flight</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.handleSubmit}>
                        <div>
                            FlightNumber = {this.state.number}
                        </div>
                        <Form.Group controlId="formBasicSelect">
                            <Form.Label>Departure Airport</Form.Label>
                            <Form.Select defaultValue={-1} onChange={this.onDepartureAirportChanged} >
                                <option value={this.state.departureAirport.id}>Keep Current</option>
                                {this.props.airportList.map( (Airport: Airport) => (
                                <React.Fragment key={Airport.id}>
                                    <option value={Airport.id}>{Airport.name}</option>
                                </React.Fragment>
                                ))}

                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="departureDay">
                            <Form.Label>Departure Day (yyyy-mm-dd)</Form.Label>
                            <Form.Control type="departureDay" name="departureDay" onChange={this.onDepartureDayChanged} value={this.state.departureDay} placeholder="Enter Departure Day" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="departureTime">
                            <Form.Label>Departure Time (00:00:00)</Form.Label>
                            <Form.Control type="departureTime" name="departureTime" onChange={this.onDepartureTimeChanged} value={this.state.departureTime} placeholder="Enter Departure Time" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Arrival Airport</Form.Label>
                            <Form.Select onChange={this.onArrivalAirportChanged} value={-1}>
                                <option value={this.state.arrivalAirport.id}>Keep Current</option>
                                {this.props.airportList.map( (Airport: Airport) => (
                                <React.Fragment key={Airport.id}>
                                    <option value={Airport.id}>{Airport.name}</option>
                                </React.Fragment>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="arrivalDay">
                            <Form.Label>Arrival Day (yyyy-mm-dd)</Form.Label>
                            <Form.Control type="arrivalDay" name="arrivalDay" onChange={this.onArrivalDayChanged} value={this.state.arrivalDay} placeholder="Enter Arrival Day" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="arrivalTime">
                            <Form.Label>Arrival Time (00:00:00)</Form.Label>
                            <Form.Control type="arrivalTime" name="arrivalTime" onChange={this.onArrivalTimeChanged} value={this.state.arrivalTime} placeholder="Enter Arrival Time" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="capacity">
                            <Form.Label>Max Capacity</Form.Label>
                            <Form.Control type="capacity" name="capacity" onChange={this.onMaxCapacityChanged} value={this.state.maxCapacity} placeholder="Enter Max Capacity" />
                        </Form.Group>
                
                        {/* <Form.Group className="mb-3" controlId="lastName">
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
                        </Form.Group> */}
                        {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group> */}
                        <Button variant="secondary" onClick={this.handleClose}>
                        Close
                        </Button>
                        <Button variant="primary" type="submit">
                        Submit
                        </Button>
                    </Form>
                </Modal.Body>
                </Modal>
            </>
            )
    }
  }



export default EditFlight;