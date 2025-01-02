using System.ComponentModel.DataAnnotations;

using FlightReservationsApi.Attributes;

namespace FlightReservationsApi.Tests;

public class GreaterThanOrEqualDateAttributeTests
{
    private class TestModel
    {
        public DateTime StartDate { get; set; }

        [DateGreaterThanOrEqual("StartDate")]
        public DateTime EndDate { get; set; }
    }

    [Fact]
    public void Should_ReturnSuccess_When_EndDateIsGreaterThanStartDate()
    {
        // Arrange
        var model = new TestModel
        {
            StartDate = new DateTime(2023, 1, 1),
            EndDate = new DateTime(2023, 1, 2)
        };

        var context = new ValidationContext(model) { MemberName = "EndDate" };
        var attribute = new DateGreaterThanOrEqualAttribute("StartDate");

        // Act
        var result = attribute.GetValidationResult(model.EndDate, context);

        // Assert
        Assert.Null(result);
    }

    [Fact]
    public void Should_ReturnSuccess_When_EndDateIsEqualToStartDate()
    {
        // Arrange
        var model = new TestModel
        {
            StartDate = new DateTime(2023, 1, 1),
            EndDate = new DateTime(2023, 1, 1)
        };

        var context = new ValidationContext(model) { MemberName = "EndDate" };
        var attribute = new DateGreaterThanOrEqualAttribute("StartDate");

        // Act
        var result = attribute.GetValidationResult(model.EndDate, context);

        // Assert
        Assert.Null(result);
    }

    [Fact]
    public void Should_ReturnValidationError_When_EndDateIsLessThanStartDate()
    {
        // Arrange
        var model = new TestModel
        {
            StartDate = new DateTime(2023, 1, 2),
            EndDate = new DateTime(2023, 1, 1)
        };

        var context = new ValidationContext(model) { MemberName = "EndDate" };
        var attribute = new DateGreaterThanOrEqualAttribute("StartDate");

        // Act
        var result = attribute.GetValidationResult(model.EndDate, context);

        // Assert
        Assert.NotNull(result);
        Assert.Equal("EndDate must be greater than or equal to StartDate.", result.ErrorMessage);
    }

    [Fact]
    public void Should_ThrowException_When_ComparisonPropertyDoesNotExist()
    {
        // Arrange
        var model = new TestModel
        {
            StartDate = new DateTime(2023, 1, 1),
            EndDate = new DateTime(2023, 1, 2)
        };

        var context = new ValidationContext(model) { MemberName = "EndDate" };
        var attribute = new DateGreaterThanOrEqualAttribute("NonExistentProperty");

        // Act & Assert
        var exception = Assert.Throws<ArgumentException>(() =>
            attribute.GetValidationResult(model.EndDate, context)
        );

        Assert.Equal("Property with name NonExistentProperty not found.", exception.Message);
    }
}
  