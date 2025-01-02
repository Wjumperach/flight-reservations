using System.ComponentModel.DataAnnotations;

namespace FlightReservationsApi.Attributes;

public class DateGreaterThanOrEqualAttribute(string comparisonProperty) : ValidationAttribute
{
    private readonly string _comparisonProperty = comparisonProperty;

    protected override ValidationResult IsValid(object? value, ValidationContext validationContext)
    {
        var endDate = (DateTime?)value;

        var comparisonProperty = validationContext.ObjectType.GetProperty(_comparisonProperty) ?? throw new ArgumentException($"Property with name {_comparisonProperty} not found.");
        var startDate = (DateTime?)comparisonProperty.GetValue(validationContext.ObjectInstance);

        if (endDate.HasValue && startDate.HasValue && endDate < startDate)
        {
            return new ValidationResult(ErrorMessage ?? $"{validationContext.DisplayName} must be greater than or equal to {_comparisonProperty}.");
        }

        return ValidationResult.Success!;
    }
}
