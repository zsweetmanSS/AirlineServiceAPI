import React, { EventHandler, useState } from 'react';
import {AddFlightDTO} from '../dataModels/Flight'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import APIService from '../services/apiService';
import Airport from '../dataModels/Airport';
import TimePicker from 'rc-time-picker';
import moment from 'moment';

type AddFlightProps = {
    airportList: Airport[]
}

type AddFlightState = {
    departureDay: string,
    departureTime: string,
    arrivalDay: string,
    arrivalTime: string,
    maxCapacity: number,
    arrivalAirport: Airport,
    departureAirport: Airport,
    show : boolean
}


class AddFlight extends React.Component<AddFlightProps, AddFlightState> {

    constructor(props: AddFlightProps) {
        super(props);
        this.state = {
            departureDay: "",
            departureTime: "",
            arrivalDay: "",
            arrivalTime: "",
            maxCapacity: 50,
            arrivalAirport: props.airportList[0],
            departureAirport: props.airportList[1],
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
        let flight: AddFlightDTO = {
            departureDate: `${this.state.departureDay}T${this.state.departureTime}:00.000Z`,
            arrivalDate: `${this.state.arrivalDay}T${this.state.arrivalTime}:00.000Z`,
            maxCapacity: this.state.maxCapacity,
            arrivalAirport: this.state.arrivalAirport,
            departureAirport: this.state.departureAirport
        }
        APIService.createFlight(flight);
        window.location.reload();
        this.handleClose();
    }
    render() {
        return (
            <>
                <Button className="color-button" onClick={this.handleShow}>
                Add New Flight
                </Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Flight</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group>
                            <Form.Label>Departure Airport</Form.Label>
                            <Form.Select onChange={this.onDepartureAirportChanged} defaultValue={-1} >
                                <option>Select Departure Airport</option>
                                {this.props.airportList.map( (Airport: Airport) => (
                                <React.Fragment key={Airport.id}>
                                    <option value={Airport.id}>{Airport.name}</option>
                                </React.Fragment>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="departureDay">
                            <Form.Label>Departure Day (yyyy-mm-dd)</Form.Label>
                            <Form.Control type="date" name="departureDay" onChange={this.onDepartureDayChanged} value={this.state.departureDay} placeholder="Enter Departure Day" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="departureTime">
                            <Form.Label>Departure Time (00:00:00)</Form.Label>
                            {/* <TimePicker showSecond={false} defaultValue={moment().hour(0).minute(0)} format={"hh:mm:ss a"} onChange={this.onDepartureTimeChanged} use12Hours inputReadOnly }></TimePicker> */}
                            <Form.Control type="time" name="departureTime" onChange={this.onDepartureTimeChanged} value={this.state.departureTime} placeholder="Enter Departure Time" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Arrival Airport</Form.Label>
                            <Form.Select onChange={this.onArrivalAirportChanged} defaultValue={-1}>
                                <option>Select Arrival Airport</option>
                                {this.props.airportList.map( (Airport: Airport) => (
                                <React.Fragment key={Airport.id}>
                                    <option value={Airport.id}>{Airport.name}</option>
                                </React.Fragment>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="arrivalDay">
                            <Form.Label>Arrival Day (yyyy-mm-dd)</Form.Label>
                            <Form.Control type="date" name="arrivalDay" onChange={this.onArrivalDayChanged} value={this.state.arrivalDay} placeholder="Enter Arrival Day" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="arrivalTime">
                            <Form.Label>Arrival Time (00:00:00)</Form.Label>
                            <Form.Control type="time" name="arrivalTime" onChange={this.onArrivalTimeChanged} value={this.state.arrivalTime} placeholder="Enter Arrival Time" />
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
  export default AddFlight;