import Airport from "./Airport";

interface Flight {
    number: number;
    departureDate: string;
    arrivalDate: string;
    maxCapacity: number;
    arrivalAirport: Airport;
    departureAirport: Airport;
}

export interface AddFlightDTO {
    departureDate: string;
    arrivalDate: string;
    maxCapacity: number;
    arrivalAirport: Airport;
    departureAirport: Airport;
}

export default Flight;