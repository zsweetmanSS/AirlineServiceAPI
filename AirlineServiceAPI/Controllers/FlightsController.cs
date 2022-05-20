#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AirlineService.Data;
using AirlineServiceAPI.View_Models;

namespace AirlineServiceAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FlightsController : ControllerBase {
        private readonly AirlineContext _context;

        public FlightsController(AirlineContext context) {
            _context = context;
        }

        // GET: api/Flights
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Flight>>> GetFlights() {
            return await _context.Flights
                .Include(f => f.ArrivalAirport)
                .Include(f => f.DepartureAirport)
                .ToListAsync();
        }

        // GET: api/Flights/5
        [HttpGet("{number}")]
        public async Task<ActionResult<FlightBookingsViewModel>> GetFlight(int number) {
            var flight = await _context.Flights
                .Include(f => f.ArrivalAirport)
                .Include(f => f.DepartureAirport)
                //.Include(f => f.Bookings)
                .FirstAsync(f => f.Number == number);
            var bookings = await _context.Bookings
                .Include(b => b.Flight)
                .Where(b => b.FlightNumber == number)
                .ToListAsync();
            FlightBookingsViewModel flightVM = new FlightBookingsViewModel() {
                Number = number,
                DepartureDate = flight.DepartureDate,
                ArrivalDate = flight.ArrivalDate,
                MaxCapacity = flight.MaxCapacity,
                ArrivalAirport = flight.ArrivalAirport,
                DepartureAirport = flight.DepartureAirport,
                Bookings = bookings,
                numberBooked = bookings.Count()
            };

            if (flight == null) {
                return NotFound();
            }

            return flightVM;
        }

        // PUT: api/Flights/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linknumber=2123754
        [HttpPut("{number}")]
        public async Task<IActionResult> PutFlight(int number, Flight flight) {
            if (number != flight.Number) {
                return BadRequest();
            }
            var departureAirport = await _context.Airports.FirstAsync(a => a.Id == flight.DepartureAirport.Id);
            var arrivalAirport = await _context.Airports.FirstAsync(a => a.Id == flight.ArrivalAirport.Id);
            var flightTemp = new Flight() { Number = flight.Number, MaxCapacity = flight.MaxCapacity, ArrivalDate = flight.ArrivalDate, DepartureDate = flight.DepartureDate, ArrivalAirport = arrivalAirport, DepartureAirport = departureAirport };
            _context.Entry(flightTemp).State = EntityState.Modified;

            try {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) {
                if (!FlightExists(number)) {
                    return NotFound();
                }
                else {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Flights
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linknumber=2123754
        [HttpPost]
        public async Task<ActionResult<Flight>> PostFlight(Flight flight) {
            var departureAirport = await _context.Airports.FirstAsync(a => a.Id == flight.DepartureAirport.Id);
            var arrivalAirport = await _context.Airports.FirstAsync(a => a.Id == flight.ArrivalAirport.Id);
            var flightTemp = new Flight() { MaxCapacity = flight.MaxCapacity, ArrivalDate = flight.ArrivalDate, DepartureDate = flight.DepartureDate, ArrivalAirport = arrivalAirport, DepartureAirport = departureAirport };
            _context.Flights.Add(flightTemp);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFlight", new { number = flightTemp.Number }, flightTemp);
        }


        // DELETE: api/Flights/5
        [HttpDelete("{number}")]
        public async Task<IActionResult> DeleteFlight(int number)
        {
            var flight = await _context.Flights.FindAsync(number);
            if (flight == null)
            {
                return NotFound();
            }

            _context.Flights.Remove(flight);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool FlightExists(int number)
        {
            return _context.Flights.Any(e => e.Number == number);
        }
    }
}
