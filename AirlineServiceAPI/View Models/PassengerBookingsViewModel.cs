using AirlineService.Data;

namespace AirlineServiceAPI.ViewModels {
    public class PassengerBookingsViewModel {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Job { get; set; } = null!;
        public string Email { get; set; } = null!;
        public int Age { get; set; }
        public List<Booking> Bookings { get; set; }
    }
}
