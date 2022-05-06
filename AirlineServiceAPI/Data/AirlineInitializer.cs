using AirlineService.Data;
using Microsoft.EntityFrameworkCore;

namespace AirlineServiceAPI.Data {
    public static class AirlineInitializer {
        public static void Initialize(IServiceProvider serviceProvider) {
            using (var context = new AirlineContext(serviceProvider.GetRequiredService<DbContextOptions<AirlineContext>>())) {
                context.Database.EnsureCreated();
                if (!context.Passengers.Any()) {
                    var passengersToAdd = new Passenger[] {
                        new Passenger {Name="Zane Sweetman",Job="Programmer",Email="zane.sweetman@gmail.com",Age=27},
                        new Passenger {Name="Joe Shmoe",Job="Handiman",Email="JShmoe02@yahoo.com",Age=54}
                    };
                    context.Passengers.AddRange(passengersToAdd);
                    context.SaveChanges();
                }
                if (!context.Airports.Any()) {
                    var airportsToAdd = new Airport[] {
                        new Airport {Name="Chicago"},
                        new Airport {Name="New York"}
                    };
                    context.Airports.AddRange(airportsToAdd);
                    context.SaveChanges();
                }
                if (!context.Flights.Any()) {
                    var flightsToAdd = new Flight[] {
                        new Flight {MaxCapacity=150,ArrivalAirport=context.Airports.First(a => a.Id == 1),DepartureAirport=context.Airports.First(a => a.Id == 2)},
                        new Flight {MaxCapacity=1,ArrivalAirport=context.Airports.First(a => a.Id == 1),DepartureAirport=context.Airports.First(a => a.Id == 2)}
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
