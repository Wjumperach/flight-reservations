using System.ComponentModel.DataAnnotations;

using FlightReservationsApi.Attributes;
using FlightReservationsApi.Enums;

namespace FlightReservationsApi.Models;

public class Reservation
{
    [Key]
    public Guid Id { get; set; }

    [Required]
    [MinLength(2)]
    [MaxLength(50)]
    [RegularExpression("^[a-zA-Z'-]+$")]
    public string FirstName { get; set; } = string.Empty;

    [Required]
    [MinLength(2)]
    [MaxLength(50)]
    [RegularExpression("^[a-zA-Z'-]+$")]
    public string LastName { get; set; } = string.Empty;

    [Required]
    [MinLength(2)]
    [MaxLength(6)]
    public string FlightNumber { get; set; } = string.Empty;

    [Required]
    [DataType(DataType.Date)]
    [FutureDate]
    public DateTime DepartureDate { get; set; }

    [Required]
    [DataType(DataType.Date)]
    [DateGreaterThanOrEqual("DepartureDate")]
    [FutureDate]
    public DateTime ArrivalDate { get; set; }

    [Required]
    [EnumDataType(typeof(TicketClass))] 
    public TicketClass TicketClass { get; set; }
}