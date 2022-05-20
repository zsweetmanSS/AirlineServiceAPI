interface Passenger {
    id: number;
    firstName: string;
    lastName: string;
    job: string;
    email: string;
    age: number;
}
export type AddPassengerDTO = {
    firstName : string,
    lastName : string,
    job : string,
    email : string,
    age : number,
}

export default Passenger;