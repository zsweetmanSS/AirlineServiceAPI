import React, { EventHandler, useState } from 'react';
import Passenger, {AddPassengerDTO} from '../dataModels/Passenger'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import APIService from '../services/apiService';
import EditPassenger from '../modals/EditPassenger';
import AddPassenger from '../modals/AddPassenger';
import DeletePassenger from '../modals/DeletePassenger';
import { resolveModuleNameFromCache } from 'typescript';


type PassengerViewProps = {
    PassengerList: Passenger[]
}
type PassengerViewState  = {
    
}
class PassengerView extends React.Component<PassengerViewProps, PassengerViewState> {
    // state: PassengerViewState = {
    //     PassengerList: [],
    // };
    // componentDidMount() {
    //     APIService.getPassengers()
    //       .then((response) => {
    //         this.setState({
    //           PassengerList: response.data
    //         });
    //       })
    //       .catch((err: Error) => {
    //         console.log(err);
    //       });
    // };  
    render() {
        return (
            <>
                
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <td>First Name</td>
                            <td>Last Name</td>
                            <td>Email</td>
                            <td>Age</td>
                            <td>Job</td>
                            <td></td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.PassengerList.map( (Passenger: Passenger) => (
                            <React.Fragment key={Passenger.id}>
                                <tr>
                                    <td>{Passenger.firstName}</td>
                                    <td>{Passenger.lastName}</td>
                                    <td>{Passenger.email}</td>
                                    <td>{Passenger.age}</td>
                                    <td>{Passenger.job}</td>
                                    <td><EditPassenger Passenger={Passenger}/></td>
                                    <td><DeletePassenger  idin={Passenger.id}/></td>
                                </tr>
                            </React.Fragment>
                        ))}
                    </tbody>
                </Table>
                <AddPassenger />
            </>
        )
    };  
}


export default PassengerView;