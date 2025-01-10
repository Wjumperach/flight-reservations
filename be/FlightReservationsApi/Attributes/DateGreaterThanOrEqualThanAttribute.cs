using System.ComponentModel.DataAnnotations;

namespace FlightReservationsApi.Attributes;

public class DateGreaterThanOrEqualThanAttribute(string comparisonProperty) : ValidationAttribute
{
    private readonly string _comparisonProperty = comparisonProperty;

    protected override ValidationResult IsValid(object? value, ValidationContext validationContext)
    {
        if (value is DateTime dateValue)
        {
            var endDate = dateValue;

            var comparisonProperty = validationContext.ObjectType.GetProperty(_comparisonProperty) ?? throw new ArgumentException($"Property with name {_comparisonProperty} not found");
            var startDate = (DateTime?)comparisonProperty.GetValue(validationContext.ObjectInstance);

            if (startDate.HasValue && endDate < startDate)
            {
                return new ValidationResult(ErrorMessage ?? $"{validationContext.DisplayName} must be greater than or equal to {_comparisonProperty}");
            }

            return ValidationResult.Success!;
        }

        if (value is string stringEndDate)
        {
            if (!DateTime.TryParse(stringEndDate, out DateTime endDate)) {
                return new ValidationResult(ErrorMessage ?? "Invalid end date format");
            }

            var comparisonProperty = validationContext.ObjectType.GetProperty(_comparisonProperty) ?? throw new ArgumentException($"Property with name {_comparisonProperty} not found");
            var stringStartDate = (string?)comparisonProperty.GetValue(validationContext.ObjectInstance);

            if (!DateTime.TryParse(stringStartDate, out DateTime startDate)) {
                return new ValidationResult(ErrorMessage ?? "Invalid start date format");
            }

            if (endDate < startDate)
            {
                return new ValidationResult(ErrorMessage ?? $"{validationContext.DisplayName} must be greater than or equal to {_comparisonProperty}");
            }

            return ValidationResult.Success!;
        }

        return new ValidationResult(ErrorMessage ?? "Invalid end date format");
    }
}
