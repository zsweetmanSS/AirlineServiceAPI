import Flight from './Flight';
import Passenger from './Passenger';

interface Booking {
    confirmationNumber: number;
    flight: Flight;
    passenger: Passenger;
    passengerId: number;
    flightNumber: number;
}

export default Booking;