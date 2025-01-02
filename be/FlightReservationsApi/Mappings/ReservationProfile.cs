using AutoMapper;

using FlightReservationsApi.Models;
using FlightReservationsApi.ViewModels;

namespace FlightReservationsApi.Mappings;

public class ReservationProfile : Profile
{
    public ReservationProfile()
    {
        CreateMap<Reservation, ReservationViewModel>();
        CreateMap<ReservationInputModel, Reservation>();
    }
}
