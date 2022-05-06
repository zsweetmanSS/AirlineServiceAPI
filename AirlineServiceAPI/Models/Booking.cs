using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AirlineService.Data {
    public class Booking {
        [Key]
        public int ConfirmationNumber { get; set; }
        public Flight Flight { get; set; } = null!;
        public Passenger Passenger { get; set; } = null!;
        public int PassengerId { get; set; }
        public int FlightNumber { get; set; }
    }
}
