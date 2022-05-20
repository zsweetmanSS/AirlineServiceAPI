using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AirlineServiceAPI.Migrations
{
    public partial class fixingPassengers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bookings_Flights_FlightNumber",
                table: "Bookings");

            migrationBuilder.DropForeignKey(
                name: "FK_Bookings_Passengers_PassengerId",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "NumberBooked",
                table: "Flights");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Passengers",
                newName: "LastName");

            migrationBuilder.AddColumn<string>(
                name: "FirstName",
                table: "Passengers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddForeignKey(
                name: "FK_Bookings_Flights_FlightNumber",
                table: "Bookings",
                column: "FlightNumber",
                principalTable: "Flights",
                principalColumn: "Number",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Bookings_Passengers_PassengerId",
                table: "Bookings",
                column: "PassengerId",
                principalTable: "Passengers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bookings_Flights_FlightNumber",
                table: "Bookings");

            migrationBuilder.DropForeignKey(
                name: "FK_Bookings_Passengers_PassengerId",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "FirstName",
                table: "Passengers");

            migrationBuilder.RenameColumn(
                name: "LastName",
                table: "Passengers",
                newName: "Name");

            migrationBuilder.AddColumn<int>(
                name: "NumberBooked",
                table: "Flights",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_Bookings_Flights_FlightNumber",
                table: "Bookings",
                column: "FlightNumber",
                principalTable: "Flights",
                principalColumn: "Number");

            migrationBuilder.AddForeignKey(
                name: "FK_Bookings_Passengers_PassengerId",
                table: "Bookings",
                column: "PassengerId",
                principalTable: "Passengers",
                principalColumn: "Id");
        }
    }
}
