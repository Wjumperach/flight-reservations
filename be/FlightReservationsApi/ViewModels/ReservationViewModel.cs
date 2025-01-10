using FlightReservationsApi.Enums;

namespace FlightReservationsApi.ViewModels;

public class ReservationViewModel
{
    public Guid? Id { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string FlightNumber { get; set; } = string.Empty;
    public DateTime DepartureDateTime { get; set; }
    public DateTime ArrivalDateTime { get; set; }
    public TicketClass TicketClass { get; set; }
}
