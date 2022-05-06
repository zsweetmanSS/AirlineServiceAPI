using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AirlineService.Data {
    public class Passenger {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Job { get; set; } = null!;
        public string Email { get; set; } = null!;
        public int Age { get; set; }
        //public ICollection<Booking>? Bookings { get; set; }
    }
}
