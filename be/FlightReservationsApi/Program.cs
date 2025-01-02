using System.IO.Abstractions;

using FlightReservationsApi.ExceptionHandling;
using FlightReservationsApi.Models;
using FlightReservationsApi.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
builder.Services.AddProblemDetails();

builder.Services.AddCors();
builder.Services.AddControllers();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IFileSystem, FileSystem>();
builder.Services.AddScoped<IReservationService, ReservationService>();

builder.Services.Configure<DatabaseSettings>(builder.Configuration.GetSection("Database"));

var app = builder.Build();

app.UseExceptionHandler();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(builder => builder
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader()
);

app.MapControllers();
app.Run();
