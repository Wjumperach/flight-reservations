using System.ComponentModel.DataAnnotations;

using FlightReservationsApi.Attributes;
using FlightReservationsApi.Enums;

namespace FlightReservationsApi.ViewModels;

public class ReservationInputModel
{
    [Required(ErrorMessage = "The field First name is required")]
    [MinLength(2, ErrorMessage = "The field First name must be a string or array type with a minimum length of '2'.")]
    [MaxLength(50, ErrorMessage = "The field First name must be a string or array type with a maximum length of '50'.")]
    [RegularExpression("^[a-zA-Z'-]+$", ErrorMessage = "The field First name is invalid")]
    public string FirstName { get; set; } = string.Empty;

    [Required(ErrorMessage = "The field Last name is required")]
    [MinLength(2, ErrorMessage = "The field Last name must be a string or array type with a minimum length of '2'.")]
    [MaxLength(50, ErrorMessage = "The field Last name must be a string or array type with a maximum length of '50'.")]
    [RegularExpression("^[a-zA-Z'-]+$", ErrorMessage = "The field Last name is invalid")]
    public string LastName { get; set; } = string.Empty;

    [Required(ErrorMessage = "The field Flight number is required")]
    [MinLength(2, ErrorMessage = "The field Flight number must be a string or array type with a minimum length of '2'.")]
    [MaxLength(6, ErrorMessage = "The field Flight number must be a string or array type with a maximum length of '6'.")]
    public string FlightNumber { get; set; } = string.Empty;

    [Required(ErrorMessage = "Departure date is required")]
    [DataType(DataType.DateTime, ErrorMessage = "Departure date format is invalid")]
    [DateTimeFormat]
    [FutureDate(ErrorMessage = "The Departure date must be today or in the future")]
    public string? DepartureDateTime { get; set; }

    [Required(ErrorMessage = "Arrival date is required.")]
    [DataType(DataType.DateTime, ErrorMessage = "Arrival date format is invalid")]
    [DateGreaterThanOrEqualThan("DepartureDateTime", ErrorMessage = "Arrival date must be greater than or equal to Departure date.")]
    [FutureDate(ErrorMessage = "The Arrival date must be today or in the future")]
    public string? ArrivalDateTime { get; set; }

    [Required(ErrorMessage = "The field Ticket class is required")]
    [EnumDataType(typeof(TicketClass), ErrorMessage = "The field Ticket class is invalid")] 
    public TicketClass TicketClass { get; set; }
}
