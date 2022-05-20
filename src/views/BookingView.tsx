import React, { EventHandler, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import APIService from '../services/apiService';
import Booking from '../dataModels/Booking'
import { resolveModuleNameFromCache } from 'typescript';
import Passenger from '../dataModels/Passenger';
import Flight from '../dataModels/Flight';
import EditBooking from '../modals/EditBooking';
import AddBooking from '../modals/AddBooking';
import DeleteBooking from '../modals/DeleteBooking';

type BookingViewProps = {
    BookingList: Booking[],
    PassengerList: Passenger[],
    FlightList: Flight[]
}

type BookingViewState = {
}

class BookingView extends React.Component<BookingViewProps, BookingViewState> {
    render() {
        return (
            <>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <td>Booking #</td>
                            <td>Passenger Name</td>
                            <td>Departure Date</td>
                            <td>Departure Time</td>
                            <td>Arrival Date</td>
                            <td>Arrival Time</td>
                            <td>Departure Airport</td>
                            <td>Arrival Airport</td>
                            <td></td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.BookingList.map( (Booking: Booking) => (
                            <React.Fragment key={Booking.confirmationNumber}>
                                <tr>
                                    <td>{Booking.confirmationNumber}</td>
                                    <td>{Booking.passenger.firstName} {Booking.passenger.lastName}</td>
                                    <td>{Booking.flight.departureDate.substring(0,10)}</td>
                                    <td>{Booking.flight.departureDate.substring(11,19)}</td>
                                    <td>{Booking.flight.arrivalDate.substring(0,10)}</td>
                                    <td>{Booking.flight.arrivalDate.substring(11,19)}</td>
                                    <td>{Booking.flight.departureAirport.name}</td>
                                    <td>{Booking.flight.arrivalAirport.name}</td>
                                    <td><EditBooking Booking={Booking} PassengerList={this.props.PassengerList} FlightList={this.props.FlightList}/></td>
                                    <td><DeleteBooking  confirmationNumber={Booking.confirmationNumber}/></td>
                                </tr>
                            </React.Fragment>
                        ))}
                    </tbody>
                </Table>
                <AddBooking PassengerList={this.props.PassengerList} FlightList={this.props.FlightList}/>
            </>
        )
    }   
}


export default BookingView;