using AirlineService.Data;
using AirlineServiceAPI.Data;
using Microsoft.AspNetCore.Http.Json;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

ConfigurationManager configuration = builder.Configuration;
IWebHostEnvironment environment = builder.Environment;

// Add services to the container.

builder.Services.AddControllers();
//builder.Services.Configure<JsonSerializerOptions>(options =>
//{
//    options.ReferenceHandler = ReferenceHandler.Preserve;
//});
//JsonSerializerOptions SerializerOptions = new() { ReferenceHandler = ReferenceHandler.IgnoreCycles };

builder.Services.AddDbContext<AirlineContext>(options =>
    options.UseSqlServer(configuration.GetConnectionString("AirlineContext")));
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();
using (var scope = app.Services.CreateScope()) {
    var services = scope.ServiceProvider;
    AirlineInitializer.Initialize(services);

}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment()) {
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
