using AutoMapper;
using Microsoft.AspNetCore.Mvc;

using FlightReservationsApi.Models;
using FlightReservationsApi.Services;
using FlightReservationsApi.ViewModels;

namespace FlightReservationsApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ReservationController : ControllerBase
{
    private readonly IReservationService _reservationService;
    private readonly IMapper _mapper;

    public ReservationController(IReservationService reservationService, IMapper mapper){
        _reservationService = reservationService;
        _mapper = mapper;
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetAll()
    {
        var reservations = await _reservationService.GetAllAsync();
        var reservationViewModels = _mapper.Map<List<ReservationViewModel>>(reservations);
        return Ok(reservationViewModels);
    }

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetById(Guid? id)
    {
        if (!id.HasValue)
        {
            return BadRequest();
        }

        var reservation = await _reservationService.GetByIdAsync(id.Value);
        if (reservation == null)
        {
            return NotFound();
        }

        var reservationViewModel = _mapper.Map<ReservationViewModel>(reservation);
        return Ok(reservationViewModel);
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Create([FromBody] ReservationInputModel input)
    {
        if (input is null)
        {
            return BadRequest();
        }

        if (!ModelState.IsValid)
        {
            return BadRequest();
        }

        var reservation = _mapper.Map<Reservation>(input);
        var createdReservation = await _reservationService.CreateAsync(reservation);
        var reservationViewModel = _mapper.Map<ReservationViewModel>(createdReservation);
        return CreatedAtAction(nameof(Create), new { id = reservation.Id }, reservation);
    }

    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Update(Guid? id, [FromBody] ReservationInputModel input)
    {
        if (!id.HasValue)
        {
            return BadRequest();
        }

        if (input is null)
        {
            return BadRequest();
        }

        if (!ModelState.IsValid)
        {
            return BadRequest();
        }

        var reservation = _mapper.Map<Reservation>(input);
        reservation.Id = id.Value;
        var result = await _reservationService.UpdateAsync(reservation);
        if (!result)
        {
            return NotFound();
        }

        return Ok();
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(Guid? id)
    {
        if (id is null)
        {
            return BadRequest();
        }

        var result = await _reservationService.DeleteAsync(id.Value);
        if (!result)
        {
            return NotFound();
        }

        return Ok();
    }
}