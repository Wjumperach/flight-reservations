using System.Globalization;
using AutoMapper;

using FlightReservationsApi.Models;
using FlightReservationsApi.ViewModels;

namespace FlightReservationsApi.Mappings;

public class ReservationProfile : Profile
{
    private readonly string format = "yyyy-MM-ddTHH:mm:ss.fffZ";

    public ReservationProfile()
    {
        CreateMap<Reservation, ReservationViewModel>();
        CreateMap<ReservationInputModel, Reservation>()
            .ForMember(x => x.DepartureDateTime, y => y.MapFrom(z => DateTime.ParseExact(z.DepartureDateTime ?? string.Empty, format, CultureInfo.InvariantCulture)))
            .ForMember(x => x.ArrivalDateTime, y => y.MapFrom(z => DateTime.ParseExact(z.ArrivalDateTime ?? string.Empty, format, CultureInfo.InvariantCulture)));
    }
}
