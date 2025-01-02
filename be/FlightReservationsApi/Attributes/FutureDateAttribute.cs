using System.ComponentModel.DataAnnotations;

namespace FlightReservationsApi.Attributes;

public class FutureDateAttribute : ValidationAttribute
{
    protected override ValidationResult IsValid(object? value, ValidationContext validationContext)
    {
        if (value is DateTime dateValue)
        {
            if (dateValue.Date >= DateTime.Today)
            {
                return ValidationResult.Success!;
            }
            else
            {
                return new ValidationResult(ErrorMessage ?? "The date must be today or in the future.");
            }
        }

        return new ValidationResult(ErrorMessage ?? "Invalid date format.");
    }
}
