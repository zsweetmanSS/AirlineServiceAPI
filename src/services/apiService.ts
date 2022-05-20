import Airport from '../dataModels/Airport';
import Booking from '../dataModels/Booking';
import Flight, {AddFlightDTO} from '../dataModels/Flight';
import Passenger, {AddPassengerDTO} from '../dataModels/Passenger';
import axios from "axios";
import { Http2ServerRequest } from 'http2';

const http = axios.create({
    baseURL: "https://localhost:7205",
    headers: {
        'Content-Type': 'application/json'
    }
})

const getAirports = () => {
    return http.get<Array<Airport>>("/api/Airports");
}

const getAirport = () => {
    return http.get<Airport>("/api/Airports/${id}");
}

const createAirport = (Airport: Airport) => {
    return http.post<Airport>("/api/Airports", Airport);
}

const updateAirport = (Airport: Airport) => {
    return http.put<Airport>(`api/Airports/${Airport.id}`, Airport)
}

const deleteAirport = (id: number) => {
    return http.delete<Airport>(`api/Airports/${id}`);
}

const getBookings = () => {
    return http.get<Array<Booking>>("/api/Bookings");
}

const getBooking = () => {
    return http.get<Booking>("/api/Bookings/${id}");
}

const createBooking = (Booking: Booking) => {
    return http.post<Booking>("/api/Bookings", Booking);
}

const createNewBooking = (Flight: Flight, Passenger: Passenger) => {
    return http.post<Booking>(`/api/Bookings/${Flight.number}/${Passenger.id}`)
}

const updateBooking = (Booking: Booking) => {
    return http.put<Booking>(`api/Bookings/${Booking.confirmationNumber}`, Booking)
}

const deleteBooking = (id: number) => {
    return http.delete<Booking>(`api/Bookings/${id}`);
}
const getFlights = () => {
    return http.get<Array<Flight>>("/api/Flights");
}

const getFlight = () => {
    return http.get<Flight>("/api/Flights/${id}");
}

const createFlight = (Flight: AddFlightDTO) => {
    return http.post<AddFlightDTO>("/api/Flights", Flight);
}

const updateFlight = (Flight: Flight) => {
    return http.put<Flight>(`api/Flights/${Flight.number}`, Flight)
}

const deleteFlight = (id: number) => {
    return http.delete<Flight>(`api/Flights/${id}`);
}

const getPassengers = () => {
    return http.get<Array<Passenger>>("/api/Passengers");
}

const getPassenger = () => {
    return http.get<Passenger>("/api/Passengers/${id}");
}

const createPassenger = (Passenger: AddPassengerDTO) => {
    return http.post<AddPassengerDTO>("/api/Passengers", Passenger);
}

const updatePassenger = (Passenger: Passenger) => {
    return http.put<Passenger>(`api/Passengers/${Passenger.id}`, Passenger)
}

const deletePassenger = (id: number) => {
    return http.delete<Passenger>(`api/Passengers/${id}`);
}

const APIService = {
    getAirports,
    getAirport,
    createAirport,
    updateAirport,
    deleteAirport,
    getBookings,
    getBooking,
    createBooking,
    createNewBooking,
    updateBooking,
    deleteBooking,
    getFlights,
    getFlight,
    createFlight,
    updateFlight,
    deleteFlight,
    getPassengers,
    getPassenger,
    createPassenger,
    updatePassenger,
    deletePassenger
};



export default APIService;