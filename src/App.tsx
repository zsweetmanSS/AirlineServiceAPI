import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import APIService from "./services/apiService";
////import "./views/index.ts";
import BookingView from './views/BookingView';
import FlightView from './views/FlightView';
import HomeView from './views/HomeView';
import PassengerView from './views/PassengerView';
import Passenger from './dataModels/Passenger';
import Flight from './dataModels/Flight';
import Booking from './dataModels/Booking';
import Airport from './dataModels/Airport';
import './style/styleGuide.css';

type AppProps = {

};

type AppState = {
  passengerList: Passenger[];
  flightList: Flight[],
  bookingList: Booking[],
  airportList: Airport[]
}


class App extends React.Component<AppProps, AppState> {
  state: AppState = {
    passengerList: [],
    flightList: [],
    bookingList: [],
    airportList: []
  };

  refreshData() {
    APIService.getPassengers()
      .then((response) => {
        this.setState({
          passengerList: response.data
        });
      })
      .catch((err: Error) => {
        console.log(err);
      });
      APIService.getFlights()
      .then((response) => {
        this.setState({
          flightList: response.data
        });
      })
      .catch((err: Error) => {
        console.log(err);
      });
      APIService.getBookings()
      .then((response) => {
        this.setState({
          bookingList: response.data
        });
      })
      .catch((err: Error) => {
        console.log(err);
      });
      APIService.getAirports()
      .then((response) => {
        this.setState({
          airportList: response.data
        });
      })
      .catch((err: Error) => {
        console.log(err);
      });
  }
  componentDidMount() {
    this.refreshData();
  };

  render() {
    return (
      <>
          <header>
            <Navbar className="color-nav">
              <Container>
                <Navbar.Brand href="Passenger">Airline Service Manager v1</Navbar.Brand>
                <Nav className="me-auto">
                  {/* <Nav.Link href="Home">Home</Nav.Link> */}
                  <Nav.Link href="Passenger">Passengers</Nav.Link>
                  <Nav.Link href="Flights">Flights</Nav.Link>
                  <Nav.Link href="Bookings">Bookings</Nav.Link>
                </Nav>
              </Container>
            </Navbar>
          </header>
          <BrowserRouter>
            <Routes>
                {/* <Route path="/Home" element={<HomeView />} /> */}
                <Route path="/Passenger" element={<PassengerView PassengerList={this.state.passengerList}/>} />
                <Route path="/Flights" element={<FlightView FlightList={this.state.flightList} airportList={this.state.airportList}/>} />
                <Route path="/Bookings" element={<BookingView BookingList={this.state.bookingList} PassengerList={this.state.passengerList} FlightList={this.state.flightList}/>} />
            </Routes>
          </BrowserRouter>
      </>
    );
  }
}
export default App;
