import React, { EventHandler, useState } from 'react';
import Passenger, {AddPassengerDTO} from '../dataModels/Passenger'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { resolveModuleNameFromCache } from 'typescript';
import Flight from '../dataModels/Flight';
import DeleteFlight from '../modals/DeleteFlight';
import EditFlight from '../modals/EditFlight';
import AddFlight from '../modals/AddFlight';
import Airport from '../dataModels/Airport';
import {format} from 'date-fns';

type FlightViewProps = {
    FlightList: Flight[],
    airportList: Airport[]
}

type FlightViewState = {
}

class FlightView extends React.Component<FlightViewProps, FlightViewState> {


    render() {
        return (
            <>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <td>Flight Number</td>
                            <td>Departure Date</td>
                            <td>Departure Time</td>
                            <td>Arrival Date</td>
                            <td>Arrival Time</td>
                            <td>Departure Airport</td>
                            <td>Arrival Airport</td>
                            <td>Passenger Limit</td>
                            <td></td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.FlightList.map( (Flight: Flight) => (
                            <React.Fragment key={Flight.number}>
                                <tr>
                                    <td>{Flight.number}</td>
                                    <td>{Flight.departureDate.substring(0,10)}</td>
                                    <td>{Flight.departureDate.substring(11,19)}</td>
                                    <td>{Flight.arrivalDate.substring(0,10)}</td>
                                    <td>{Flight.arrivalDate.substring(11,19)}</td>
                                    <td>{Flight.departureAirport.name}</td>
                                    <td>{Flight.arrivalAirport.name}</td>
                                    <td>{Flight.maxCapacity}</td>
                                    <td><EditFlight Flight={Flight} airportList={this.props.airportList}/></td>
                                    <td><DeleteFlight  number={Flight.number}/></td>
                                </tr>
                            </React.Fragment>
                        ))}
                    </tbody>
                </Table>
                <AddFlight airportList={this.props.airportList}/>
            </>
        )
    }    
}


export default FlightView;