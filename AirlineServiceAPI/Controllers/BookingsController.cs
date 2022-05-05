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
    public class BookingsController : ControllerBase
    {
        private readonly AirlineContext _context;

        public BookingsController(AirlineContext context)
        {
            _context = context;
        }

        // GET: api/Bookings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Booking>>> GetBookings()
        {
            return await _context.Bookings
                .Include(b => b.Flight)
                .Include(b => b.Passenger)
                .ToListAsync();
        }

        // GET: api/Bookings/5
        [HttpGet("{confirmationNumber}")]
        public async Task<ActionResult<Booking>> GetBooking(int confirmationNumber)
        {
            var booking = await _context.Bookings
                .Include(b => b.Flight)
                .Include(b => b.Passenger)
                .FirstAsync(b => b.ConfirmationNumber == confirmationNumber);

            if (booking == null)
            {
                return NotFound();
            }

            return booking;
        }

        // PUT: api/Bookings/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{confirmationNumber}")]
        public async Task<IActionResult> PutBooking(int confirmationNumber, Booking booking)
        {
            if (confirmationNumber != booking.ConfirmationNumber)
            {
                return BadRequest();
            }

            _context.Entry(booking).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookingExists(confirmationNumber))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Bookings
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Booking>> PostBooking(Booking booking)
        {
            //Booking bookingWithInclude = _context.Bookings.Include(b => b.Flight).Include(b => b.)
            if (booking.Flight.Bookings.Count >= booking.Flight.MaxCapacity) {
                return BadRequest("Flight is full");
            }
            _context.Bookings.Add(booking);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBooking", new { confirmationNumber = booking.ConfirmationNumber }, booking);
        }

        // POST: api/Bookings/FlightNumber/PassengerId
        [HttpPost("{flightNumber}/{passengerId}")]
        public async Task<ActionResult<Booking>> CreateNewBooking(int flightNumber, int passengerId) {
            //Booking bookingWithInclude = _context.Bookings.Include(b => b.Flight).Include(b => b.)
            var flight = await _context.Flights
                .FirstAsync(f => f.Number == flightNumber);
            var passenger = await _context.Passengers.FirstAsync(p => p.Id == passengerId);
            Booking newBooking = new Booking {Passenger = passenger, Flight = flight};
            if (newBooking.Flight.NumberBooked >= newBooking.Flight.MaxCapacity) {
                return BadRequest("Flight is full");
            }
            _context.Bookings.Add(newBooking);
            await _context.SaveChangesAsync();

            return Ok(newBooking);
        }

        // DELETE: api/Bookings/5
        [HttpDelete("{confirmationNumber}")]
        public async Task<IActionResult> DeleteBooking(int confirmationNumber)
        {
            var booking = await _context.Bookings.FindAsync(confirmationNumber);
            if (booking == null)
            {
                return NotFound();
            }

            _context.Bookings.Remove(booking);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BookingExists(int confirmationNumber)
        {
            return _context.Bookings.Any(e => e.ConfirmationNumber == confirmationNumber);
        }
    }
}
