using AirlineService.Data;
using Microsoft.EntityFrameworkCore;

namespace AirlineServiceAPI.Data {
    public static class AirlineInitializer {
        public static void Initialize(IServiceProvider serviceProvider) {
            using (var context = new AirlineContext(serviceProvider.GetRequiredService<DbContextOptions<AirlineContext>>())) {
                context.Database.EnsureCreated();
                if (!context.Passengers.Any()) {
                    var passengersToAdd = new Passenger[] {
                    };
                    context.Passengers.AddRange(passengersToAdd);
                    context.SaveChanges();
                }
                if (!context.Airports.Any()) {
                    var airportsToAdd = new Airport[] {
                    };
                    context.Airports.AddRange(airportsToAdd);
                    context.SaveChanges();
                }
                if (!context.Flights.Any()) {
                    var flightsToAdd = new Flight[] {
                    };
                    context.Flights.AddRange(flightsToAdd);
                    context.SaveChanges();
                }
                if (!context.Bookings.Any()) {
                    var bookingsToAdd = new Booking[] {
                    };
                    context.Bookings.AddRange(bookingsToAdd);
                    context.SaveChanges();
                }
            }
                
        }

    }
}
