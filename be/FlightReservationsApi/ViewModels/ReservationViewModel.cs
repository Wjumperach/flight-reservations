using System.ComponentModel.DataAnnotations;

using FlightReservationsApi.Attributes;
using FlightReservationsApi.Enums;

namespace FlightReservationsApi.ViewModels;

public class ReservationViewModel
{
    public Guid? Id { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string FlightNumber { get; set; } = string.Empty;
    public DateTime DepartureDate { get; set; }
    public DateTime ArrivalDate { get; set; }
    public TicketClass TicketClass { get; set; }
}
