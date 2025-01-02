FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 5281

ENV ASPNETCORE_URLS=http://+:5281

USER app
FROM --platform=$BUILDPLATFORM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG configuration=Release
WORKDIR /src
COPY ["FlightReservationsApi.csproj", "FlightReservationsApi/"]
RUN dotnet restore "FlightReservationsApi/FlightReservationsApi.csproj"
WORKDIR "/src/FlightReservationsApi"
COPY . .
RUN dotnet build "FlightReservationsApi.csproj" -c $configuration -o /app/build

FROM build AS publish
ARG configuration=Release
RUN dotnet publish "FlightReservationsApi.csproj" -c $configuration -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "FlightReservationsApi.dll"]
