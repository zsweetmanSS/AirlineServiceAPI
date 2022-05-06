using AirlineService.Data;

namespace AirlineServiceAPI.View_Models {
    public class FlightBookingsViewModel {
        public int Number { get; set; }
        public DateTime DepartureDate { get; set; }
        public DateTime ArrivalDate { get; set; }
        public int MaxCapacity { get; set; }
        public Airport ArrivalAirport { get; set; } = null!;
        public Airport DepartureAirport { get; set; } = null!;
        public ICollection<Booking>? Bookings { get; set; }
        public int numberBooked { get; set; }
    }
}
