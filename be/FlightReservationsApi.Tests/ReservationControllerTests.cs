using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Moq;

using FlightReservationsApi.Controllers;
using FlightReservationsApi.Models;
using FlightReservationsApi.Services;
using FlightReservationsApi.ViewModels;

namespace FlightReservationsApi.Tests;

public class ReservationControllerTests
{
    [Fact]
    public async Task GetAll_ReturnsOk_WhenGetAllSucceeds()
    {
        // Arrange
        var reservationServiceMock = new Mock<IReservationService>();
        var autoMapperMock = new Mock<IMapper>();
        var controller = new ReservationController(reservationServiceMock.Object, autoMapperMock.Object);

        reservationServiceMock
            .Setup(service => service.GetAllAsync())
            .ReturnsAsync([]);

        // Act
        var result = await controller.GetAll();

        // Assert
        Assert.IsType<OkObjectResult>(result);
        reservationServiceMock.Verify(s => s.GetAllAsync(), Times.Once);
    }

    [Fact]
    public async Task GetById_ReturnsOk_WhenUpdateSucceeds()
    {
        // Arrange
        var reservationServiceMock = new Mock<IReservationService>();
        var autoMapperMock = new Mock<IMapper>();
        var controller = new ReservationController(reservationServiceMock.Object, autoMapperMock.Object);
        var reservationId = Guid.NewGuid();
        var reservation = new Reservation(){
            Id = reservationId
        };

        reservationServiceMock
            .Setup(service => service.GetByIdAsync(It.IsAny<Guid>()))
            .ReturnsAsync(reservation);

        // Act
        var result = await controller.GetById(reservationId);

        // Assert
        Assert.IsType<OkObjectResult>(result);
        reservationServiceMock.Verify(s => s.GetByIdAsync(reservationId), Times.Once);
    }

    [Fact]
    public async Task GetById_ReturnsBadRequest_WhenReservationIdIsNull()
    {
        // Arrange
        var reservationServiceMock = new Mock<IReservationService>();
        var autoMapperMock = new Mock<IMapper>();
        var controller = new ReservationController(reservationServiceMock.Object, autoMapperMock.Object);

        Guid? reservationId = null;

        // Act
        var result = await controller.GetById(reservationId);

        // Assert
        Assert.IsType<BadRequestResult>(result);
    }

    [Fact]
    public async Task GetById_ReturnsNotFound_WhenGetByIdFails()
    {
        // Arrange
        var reservationServiceMock = new Mock<IReservationService>();
        var autoMapperMock = new Mock<IMapper>();
        var controller = new ReservationController(reservationServiceMock.Object, autoMapperMock.Object);
        var reservationId = Guid.NewGuid();
        Reservation? reservation = null;

        reservationServiceMock
            .Setup(service => service.GetByIdAsync(It.IsAny<Guid>()))
            .ReturnsAsync(reservation);

        // Act
        var result = await controller.GetById(reservationId);

        // Assert
        Assert.IsType<NotFoundResult>(result);
        reservationServiceMock.Verify(s => s.GetByIdAsync(reservationId), Times.Once);
    }

    [Fact]
    public async Task Create_ReturnsOk_WhenCreateSucceeds()
    {
        // Arrange
        var reservationServiceMock = new Mock<IReservationService>();
        var autoMapperMock = new Mock<IMapper>();
        var controller = new ReservationController(reservationServiceMock.Object, autoMapperMock.Object);
        var input = new ReservationInputModel()
        {

        };
        var reservation = new Reservation
        {

        };
        var view = new ReservationViewModel
        {

        };

        autoMapperMock
            .Setup(mapper => mapper.Map<Reservation>(It.IsAny<ReservationInputModel>()))
            .Returns(reservation);
        reservationServiceMock
            .Setup(service => service.CreateAsync(It.IsAny<Reservation>()))
            .ReturnsAsync(reservation);
        autoMapperMock
            .Setup(mapper => mapper.Map<ReservationViewModel>(It.IsAny<Reservation>()))
            .Returns(view);

        // Act
        var result = await controller.Create(input);

        // Assert
        Assert.IsType<CreatedAtActionResult>(result);
        reservationServiceMock.Verify(s => s.CreateAsync(reservation), Times.Once);
    }

    [Fact]
    public async Task Create_ReturnsBadRequest_WhenReservationIsNull()
    {
        // Arrange
        var reservationServiceMock = new Mock<IReservationService>();
        var autoMapperMock = new Mock<IMapper>();
        var controller = new ReservationController(reservationServiceMock.Object, autoMapperMock.Object);

        ReservationInputModel? input = null;

        // Act
;       var result = await controller.Create(input);

        // Assert
        Assert.IsType<BadRequestResult>(result);
    }

    [Fact]
    public async Task Create_ReturnsBadRequest_WhenModelStateIsInvalid()
    {
        // Arrange
        var reservationServiceMock = new Mock<IReservationService>();
        var autoMapperMock = new Mock<IMapper>();
        var controller = new ReservationController(reservationServiceMock.Object, autoMapperMock.Object);
        controller.ModelState.AddModelError("Some field", "Required"); 

        var reservation = new ReservationInputModel();

        // Act
;       var result = await controller.Create(reservation);

        // Assert
        Assert.IsType<BadRequestResult>(result);
    }

    [Fact]
    public async Task Update_ReturnsOk_WhenUpdateSucceeds()
    {
        // Arrange
        var reservationServiceMock = new Mock<IReservationService>();
        var autoMapperMock = new Mock<IMapper>();
        var controller = new ReservationController(reservationServiceMock.Object, autoMapperMock.Object);
        var reservationId = Guid.NewGuid();
        var input = new ReservationInputModel()
        {
          
        };
        var reservation = new Reservation
        {
            Id = reservationId
        };
        var view = new ReservationViewModel
        {

        };

        autoMapperMock
            .Setup(mapper => mapper.Map<Reservation>(It.IsAny<ReservationInputModel>()))
            .Returns(reservation);
        reservationServiceMock
            .Setup(service => service.UpdateAsync(It.IsAny<Reservation>()))
            .ReturnsAsync(true);
        autoMapperMock
            .Setup(mapper => mapper.Map<ReservationViewModel>(It.IsAny<Reservation>()))
            .Returns(view);

        // Act
        var result = await controller.Update(reservationId, input);

        // Assert
        Assert.IsType<OkResult>(result);
        reservationServiceMock.Verify(s => s.UpdateAsync(reservation), Times.Once);
    }

    [Fact]
    public async Task Update_ReturnsBadRequest_WhenReservationIsNull()
    {
        // Arrange
        var reservationServiceMock = new Mock<IReservationService>();
        var autoMapperMock = new Mock<IMapper>();
        var controller = new ReservationController(reservationServiceMock.Object, autoMapperMock.Object);

        var reservationId = Guid.NewGuid();
        ReservationInputModel? updatedReservation = null;

        // Act
;       var result = await controller.Update(reservationId, updatedReservation);

        // Assert
        Assert.IsType<BadRequestResult>(result);
    }

    [Fact]
    public async Task Update_ReturnsBadRequest_WhenModelStateIsInvalid()
    {
        // Arrange
        var reservationServiceMock = new Mock<IReservationService>();
        var autoMapperMock = new Mock<IMapper>();
        var controller = new ReservationController(reservationServiceMock.Object, autoMapperMock.Object);
        controller.ModelState.AddModelError("Some field", "Required"); 

        var reservationId = Guid.NewGuid();
        var input = new ReservationInputModel();

        // Act
;       var result = await controller.Update(reservationId, input);

        // Assert
        Assert.IsType<BadRequestResult>(result);
    }

    [Fact]
    public async Task Update_ReturnsNotFound_WhenUpdateFails()
    {
        // Arrange
        var reservationServiceMock = new Mock<IReservationService>();
        var autoMapperMock = new Mock<IMapper>();
        var controller = new ReservationController(reservationServiceMock.Object, autoMapperMock.Object);
        var reservationId = Guid.NewGuid();
        var input = new ReservationInputModel();
        var reservation = new Reservation
        {
            Id = reservationId
        };

        autoMapperMock
            .Setup(mapper => mapper.Map<Reservation>(It.IsAny<ReservationInputModel>()))
            .Returns(reservation);
        reservationServiceMock
            .Setup(service => service.UpdateAsync(It.IsAny<Reservation>()))
            .ReturnsAsync(false);

        // Act
        var result = await controller.Update(reservationId, input);

        // Assert
        Assert.IsType<NotFoundResult>(result);
        reservationServiceMock.Verify(s => s.UpdateAsync(reservation), Times.Once);
    }

    [Fact]
    public async Task Delete_ReturnsOk_WhenUpdateSucceeds()
    {
        // Arrange
        var reservationServiceMock = new Mock<IReservationService>();
        var autoMapperMock = new Mock<IMapper>();
        var controller = new ReservationController(reservationServiceMock.Object, autoMapperMock.Object);
        var reservationId = Guid.NewGuid();

        reservationServiceMock
            .Setup(service => service.DeleteAsync(It.IsAny<Guid>()))
            .ReturnsAsync(true);

        // Act
        var result = await controller.Delete(reservationId);

        // Assert
        Assert.IsType<OkResult>(result);
        reservationServiceMock.Verify(s => s.DeleteAsync(reservationId), Times.Once);
    }

    [Fact]
    public async Task Delete_ReturnsBadRequest_WhenReservationIdIsNull()
    {
        // Arrange
        var reservationServiceMock = new Mock<IReservationService>();
        var autoMapperMock = new Mock<IMapper>();
        var controller = new ReservationController(reservationServiceMock.Object, autoMapperMock.Object);

        Guid? reservationId = null;

        // Act
;       var result = await controller.Delete(reservationId);

        // Assert
        Assert.IsType<BadRequestResult>(result);
    }

    [Fact]
    public async Task Delete_ReturnsNotFound_WhenDeleteFails()
    {
        // Arrange
        var reservationServiceMock = new Mock<IReservationService>();
        var autoMapperMock = new Mock<IMapper>();
        var controller = new ReservationController(reservationServiceMock.Object, autoMapperMock.Object);
        var reservationId = Guid.NewGuid();

        reservationServiceMock
            .Setup(service => service.DeleteAsync(It.IsAny<Guid>()))
            .ReturnsAsync(false);

        // Act
        var result = await controller.Delete(reservationId);

        // Assert
        Assert.IsType<NotFoundResult>(result);
        reservationServiceMock.Verify(s => s.DeleteAsync(reservationId), Times.Once);
    }
}