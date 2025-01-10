using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Moq;
using System.IO.Abstractions;
using System.Text.Json;

using FlightReservationsApi.Enums;
using FlightReservationsApi.Models;
using FlightReservationsApi.Services;

namespace FlightReservationsApi.Tests;

public class ReservationServiceTests
{
    private readonly Mock<IFileSystem> _fileSystemMock;

    private readonly ReservationService _reservationService;

    public ReservationServiceTests()
    {
        var loggerMock = new Mock<ILogger<ReservationService>>();
        var databaseSettings = new DatabaseSettings(){
            FileName = "reservations.json"
        };
        var optionsMock = new Mock<IOptions<DatabaseSettings>>();
        optionsMock.Setup(o => o.Value)
            .Returns(databaseSettings);
        _fileSystemMock = new Mock<IFileSystem>();
        _fileSystemMock.Setup(f => f.File.Exists(It.IsAny<string>()))
            .Returns(true);
        _reservationService = new ReservationService(loggerMock.Object, _fileSystemMock.Object, optionsMock.Object);
    }

    [Fact]
    public async Task CreateAsync_ShouldAddNewReservation()
    {
        // Arrange
        var reservation = new Reservation
        {
            FirstName = "John",
            LastName = "Doe",
            FlightNumber = "FN123",
            DepartureDateTime = DateTime.Now,
            ArrivalDateTime = DateTime.Now.AddHours(2),
            TicketClass = 0
        };
            
        _fileSystemMock.Setup(f => f.File.ReadAllTextAsync(It.IsAny<string>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(JsonSerializer.Serialize(new List<Reservation>()));

        // Act
        var result = await _reservationService.CreateAsync(reservation);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(reservation.FirstName, result.FirstName);
        Assert.Equal(reservation.LastName, result.LastName);
        Assert.Equal(reservation.FlightNumber, result.FlightNumber);
        Assert.Equal(reservation.DepartureDateTime, result.DepartureDateTime);
        Assert.Equal(reservation.ArrivalDateTime, result.ArrivalDateTime);
        Assert.Equal(reservation.TicketClass, result.TicketClass);
        _fileSystemMock.Verify(f => f.File.WriteAllTextAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task UpdateAsync_ShouldUpdateReservation_WhenReservationExists()
    {
        // Arrange
        var id = Guid.NewGuid();
        var existingReservation = new Reservation
        {
            Id = id,
            FirstName = "John",
            LastName = "Doe",
            FlightNumber = "FN123",
            DepartureDateTime = DateTime.Now,
            ArrivalDateTime = DateTime.Now.AddHours(2),
            TicketClass = TicketClass.ECONOMY
        };

        var updatedReservation = new Reservation
        {
            Id = id,
            FirstName = "Jane",
            LastName = "Smith",
            FlightNumber = "FN456",
            DepartureDateTime = DateTime.Now.AddDays(1),
            ArrivalDateTime = DateTime.Now.AddDays(1).AddHours(2),
            TicketClass = TicketClass.BUSINESS
        };

        _fileSystemMock.Setup(f => f.File.ReadAllTextAsync(It.IsAny<string>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(JsonSerializer.Serialize(new List<Reservation> { existingReservation }));

        // Act
        var result = await _reservationService.UpdateAsync(updatedReservation);

        // Assert
        Assert.True(result);
        _fileSystemMock.Verify(f => f.File.WriteAllTextAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task DeleteAsync_ShouldRemoveReservation_WhenReservationExists()
    {
        // Arrange
        var id = Guid.NewGuid();
        var existingReservation = new Reservation
        {
            Id = id
        };

        _fileSystemMock.Setup(f => f.File.ReadAllTextAsync(It.IsAny<string>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(JsonSerializer.Serialize(new List<Reservation> { existingReservation }));

        // Act
        var result = await _reservationService.DeleteAsync(id);

        // Assert
        Assert.True(result);
        _fileSystemMock.Verify(f => f.File.WriteAllTextAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task GetByIdAsync_ShouldReturnReservation_WhenReservationExists()
    {
        // Arrange
        var id = Guid.NewGuid();
        var existingReservation = new Reservation
        {
            Id = id
        };

        _fileSystemMock.Setup(f => f.File.ReadAllTextAsync(It.IsAny<string>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(JsonSerializer.Serialize(new List<Reservation> { existingReservation }));

        // Act
        var result = await _reservationService.GetByIdAsync(id);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(id, result.Id);
    }

    [Fact]
    public async Task GetAllAsync_ShouldReturnAllReservations()
    {
        // Arrange
        var reservations = new List<Reservation>
        {
            new Reservation { Id = Guid.NewGuid() },
            new Reservation { Id = Guid.NewGuid() }
        };

        _fileSystemMock.Setup(f => f.File.ReadAllTextAsync(It.IsAny<string>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(JsonSerializer.Serialize(reservations));

        // Act
        var result = await _reservationService.GetAllAsync();

        // Assert
        Assert.Equal(reservations.Count, result.Count());
    }
}
