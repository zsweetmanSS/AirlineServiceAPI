#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AirlineService.Data;

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
                .Include(f => f.Bookings)
                .ToListAsync();
        }

        // GET: api/Flights/5
        [HttpGet("{number}")]
        public async Task<ActionResult<Flight>> GetFlight(int number) {
            var flight = await _context.Flights
                .Include(f => f.ArrivalAirport)
                .Include(f => f.DepartureAirport)
                .Include(f => f.Bookings)
                .FirstAsync(f => f.Number == number);

            if (flight == null) {
                return NotFound();
            }

            return flight;
        }

        // PUT: api/Flights/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linknumber=2123754
        [HttpPut("{number}")]
        public async Task<IActionResult> PutFlight(int number, Flight flight) {
            if (number != flight.Number) {
                return BadRequest();
            }

            _context.Entry(flight).State = EntityState.Modified;

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
            _context.Flights.Add(flight);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFlight", new { number = flight.Number }, flight);
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
