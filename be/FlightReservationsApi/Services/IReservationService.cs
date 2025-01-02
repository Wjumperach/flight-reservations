using FlightReservationsApi.Models;

namespace FlightReservationsApi.Services;

public interface IReservationService {
    Task<Reservation> CreateAsync(Reservation reservation);
    Task<bool> UpdateAsync(Reservation reservation);
    Task<bool> DeleteAsync(Guid id);
    Task<Reservation?> GetByIdAsync(Guid id);
    Task<IEnumerable<Reservation>> GetAllAsync();
}