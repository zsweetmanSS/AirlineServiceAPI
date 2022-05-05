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
                .WithMany()
                .OnDelete(DeleteBehavior.NoAction);
            modelBuilder.Entity<Flight>()
                .HasOne(f => f.DepartureAirport)
                .WithMany()
                .OnDelete(DeleteBehavior.NoAction);
            modelBuilder.Entity<Flight>()
                .HasMany(f => f.Bookings)
                .WithOne(b => b.Flight)
                .OnDelete(DeleteBehavior.NoAction);
            modelBuilder.Entity<Passenger>()
                .HasMany(p => p.Bookings)
                .WithOne(b => b.Passenger)
                .OnDelete(DeleteBehavior.NoAction);
        }
        public DbSet<Airport> Airports { get; set; } = null!;
        public DbSet<Flight> Flights { get; set; } = null!;
        public DbSet<Booking> Bookings { get; set; } = null!;
        public DbSet<Passenger> Passengers { get; set; } = null!;
    }
}
