using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AirlineService.Data {
    public class Airport {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public ICollection<Flight>? ArrivingFlights { get; set; }
        public ICollection<Flight>? DepartingFlights { get; set; }

    }
}
