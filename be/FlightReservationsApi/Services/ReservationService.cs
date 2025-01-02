using Microsoft.Extensions.Options;
using System.IO.Abstractions;
using System.Runtime.InteropServices;
using System.Text.Json;

using FlightReservationsApi.Models;

namespace FlightReservationsApi.Services;

public class ReservationService : IReservationService
{
    private ILogger _logger;
    private string _databaseFileName = "reservations.json";
    private readonly DatabaseSettings _databaseSettings = new();

    private readonly IFileSystem _fileSystem;

    public ReservationService(ILogger<ReservationService> logger, IFileSystem fileSystem, IOptions<DatabaseSettings> databaseSettings)
    {
        _logger = logger;
        _fileSystem = fileSystem;
        _databaseSettings = databaseSettings.Value;
        _databaseFileName = getDatabaseFileName();
        if (!_fileSystem.File.Exists(_databaseFileName))
        {
            _fileSystem.File.WriteAllText(_databaseFileName, JsonSerializer.Serialize(new List<Reservation>()));
        }
        _logger.LogInformation("ReservationService started.");
    }

    public async Task<IEnumerable<Reservation>> GetAllAsync()
    {
        return await Task.Run(async () =>
        {
            var reservations = await LoadReservationsAsync();
            return reservations.AsEnumerable();
        });
    }

    public async Task<Reservation> CreateAsync(Reservation reservation)
    {
        return await Task.Run(async () =>
        {
            var reservations = await LoadReservationsAsync();
            reservation.Id = Guid.NewGuid();
            reservations.Add(reservation);
            await SaveReservationsAsync(reservations);
            _logger.LogInformation("Reservation {reservationId} has been created.", reservation.Id);
            return reservation;
        });
    }

    public async Task<bool> UpdateAsync(Reservation updatedReservation)
    {
        return await Task.Run(async () =>
        {
            var reservations = await LoadReservationsAsync();
            var reservation = reservations.FirstOrDefault(r => r.Id == updatedReservation.Id);
            if (reservation == null)
                return false;

            reservation.FirstName = updatedReservation.FirstName;
            reservation.LastName = updatedReservation.LastName;
            reservation.FlightNumber = updatedReservation.FlightNumber;
            reservation.DepartureDate = updatedReservation.DepartureDate;
            reservation.ArrivalDate = updatedReservation.ArrivalDate;
            reservation.TicketClass = updatedReservation.TicketClass;

            await SaveReservationsAsync(reservations);
            _logger.LogInformation("Reservation {reservationId} has been updated.", reservation.Id);
            return true;
        });
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        return await Task.Run(async () =>
        {
            var reservations = await LoadReservationsAsync();
            var reservation = reservations.FirstOrDefault(r => r.Id == id);
            if (reservation == null)
                return false;

            reservations.Remove(reservation);
            await SaveReservationsAsync(reservations);
            _logger.LogInformation("Reservation {reservationId} has been deleted.", reservation.Id);
            return true;
        });
    }

    public async Task<Reservation?> GetByIdAsync(Guid id)
    {
        return await Task.Run(async () =>
        {
            var reservations = await LoadReservationsAsync();
            return reservations.FirstOrDefault(r => r.Id == id);
        });
    }

    private async Task<List<Reservation>> LoadReservationsAsync()
    {
        var json = await _fileSystem.File.ReadAllTextAsync(_databaseFileName);
        return JsonSerializer.Deserialize<List<Reservation>>(json) ?? [];
    }

    private async Task SaveReservationsAsync(IEnumerable<Reservation> reservations)
    {
        var json = JsonSerializer.Serialize(reservations);
        await _fileSystem.File.WriteAllTextAsync(_databaseFileName, json);
    }

    private string getDatabaseFileName(){
        var fileName =  _databaseSettings?.FileName ?? string.Empty;
        if (RuntimeInformation.IsOSPlatform(OSPlatform.Linux)){
            return Path.Combine("../data", fileName);
        }

        return fileName;
    }
}
