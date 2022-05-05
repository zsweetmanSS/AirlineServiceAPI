using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace AirlineService.Data {
    public class AirlineContext : DbContext {
        public AirlineContext() { }
        public AirlineContext(DbContextOptions<AirlineContext> options) : base (options) {
        
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            modelBuilder.Entity<Flight>()
                .HasOne(f => f.ArrivalAirport)
                .WithMany(a => a.ArrivingFlights)
                .OnDelete(DeleteBehavior.SetNull);
            modelBuilder.Entity<Flight>()
                .HasOne(f => f.DepartureAirport)
                .WithMany(a => a.DepartingFlights)
                .OnDelete(DeleteBehavior.SetNull);
            modelBuilder.Entity<Flight>()
                .HasMany(f => f.Bookings)
                .WithOne(b => b.Flight)
                .OnDelete(DeleteBehavior.SetNull);
            modelBuilder.Entity<Passenger>()
                .HasMany(p => p.Bookings)
                .WithOne(b => b.Passenger)
                .OnDelete(DeleteBehavior.SetNull);
        }
        public DbSet<Airport> Airports { get; set; } = null!;
        public DbSet<Flight> Flights { get; set; } = null!;
        public DbSet<Booking> Bookings { get; set; } = null!;
        public DbSet<Passenger> Passengers { get; set; } = null!;
    }
}
