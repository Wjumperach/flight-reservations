using System.ComponentModel.DataAnnotations;
using System.Globalization;

namespace FlightReservationsApi.Attributes;

public class DateTimeFormatAttribute : ValidationAttribute
{
    protected override ValidationResult IsValid(object? value, ValidationContext validationContext)
    {
        if (value is string stringValue) {
            string format = "yyyy-MM-ddTHH:mm:ss.fffZ";
            bool parsed = DateTime.TryParseExact(stringValue, format, CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime date);
            if (parsed) {
                return ValidationResult.Success!;
            } else {
                return new ValidationResult(ErrorMessage ?? "Invalid DateTime format");
            }
        }
        return new ValidationResult(ErrorMessage ?? "Invalid DateTime format");
    } 
}