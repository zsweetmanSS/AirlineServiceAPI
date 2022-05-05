using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AirlineService.Data {
    public class Flight {
        [Key]
        public int Number { get; set; }
        public DateTime DepartureDate { get; set; }
        public DateTime ArrivalDate { get; set; }
        public int MaxCapacity { get; set; }
        public Airport ArrivalAirport { get; set; } = null!;
        public Airport DepartureAirport { get; set; } = null!;
        public List<Booking>? Bookings { get; set; }
    }
}
