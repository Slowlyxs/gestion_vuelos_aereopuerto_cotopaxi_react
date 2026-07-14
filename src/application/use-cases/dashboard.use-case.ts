// src/application/use-cases/dashboard.use-case.ts

import { getAirportsUseCase } from "./get-airports.usecase";
import type { Airport } from "@/domain/entities/airport.entity";

export interface DashboardStats {
  totalAirports: number;
  countries: number;
  cities: number;
  airportsWithImage: number;
  airports: Airport[];
}

export async function dashboardUseCase(): Promise<DashboardStats> {
  const airports = await getAirportsUseCase();

  const countries = new Set(
    airports.map((airport) => airport.pais)
  );

  const cities = new Set(
    airports.map((airport) => airport.ciudad)
  );

  const airportsWithImage = airports.filter(
    (airport) => Boolean(airport.image_url || airport.image)
  );

  return {
    totalAirports: airports.length,
    countries: countries.size,
    cities: cities.size,
    airportsWithImage: airportsWithImage.length,
    airports,
  };
}