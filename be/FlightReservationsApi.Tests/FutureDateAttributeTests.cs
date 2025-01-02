using System.ComponentModel.DataAnnotations;

using FlightReservationsApi.Attributes;

namespace FlightReservationsApi.Tests;

public class FutureDateAttributeTests
{
    private class TestModel
    {
        [FutureDate(ErrorMessage = "The date must be today or in the future.")]
        public DateTime DateToValidate { get; set; }
    }

    [Fact]
    public void Should_ReturnSuccess_When_DateIsToday()
    {
        // Arrange
        var model = new TestModel
        {
            DateToValidate = DateTime.Today
        };

        var context = new ValidationContext(model) { MemberName = "DateToValidate" };
        var attribute = new FutureDateAttribute();

        // Act
        var result = attribute.GetValidationResult(model.DateToValidate, context);

        // Assert
        Assert.Null(result);
    }

    [Fact]
    public void Should_ReturnSuccess_When_DateIsInFuture()
    {
        // Arrange
        var model = new TestModel
        {
            DateToValidate = DateTime.Today.AddDays(1)
        };

        var context = new ValidationContext(model) { MemberName = "DateToValidate" };
        var attribute = new FutureDateAttribute();

        // Act
        var result = attribute.GetValidationResult(model.DateToValidate, context);

        // Assert
        Assert.Null(result);
    }

    [Fact]
    public void Should_ReturnValidationError_When_DateIsInPast()
    {
        // Arrange
        var model = new TestModel
        {
            DateToValidate = DateTime.Today.AddDays(-1)
        };

        var context = new ValidationContext(model) { MemberName = "DateToValidate" };
        var attribute = new FutureDateAttribute();

        // Act
        var result = attribute.GetValidationResult(model.DateToValidate, context);

        // Assert
        Assert.NotNull(result);
        Assert.Equal("The date must be today or in the future.", result.ErrorMessage);
    }

    [Fact]
    public void Should_ReturnValidationError_When_ValueIsNotDateTime()
    {
        // Arrange
        var context = new ValidationContext(new TestModel()) { MemberName = "DateToValidate" };
        var attribute = new FutureDateAttribute();

        // Act
        var result = attribute.GetValidationResult("NotADate", context);

        // Assert
        Assert.NotNull(result);
        Assert.Equal("Invalid date format.", result.ErrorMessage);
    }

    [Fact]
    public void Should_ReturnValidationError_When_ValueIsNull()
    {
        // Arrange
        var context = new ValidationContext(new TestModel()) { MemberName = "DateToValidate" };
        var attribute = new FutureDateAttribute();

        // Act
        var result = attribute.GetValidationResult(null, context);

        // Assert
        Assert.NotNull(result);
        Assert.Equal("Invalid date format.", result.ErrorMessage);
    }
}
