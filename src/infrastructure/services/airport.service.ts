// src/infrastructure/services/airport.service.ts

import { apiClient } from "../http/axios-client";

import type { Airport } from "@/domain/entities/airport.entity";


export const airportService = {

async getAll(): Promise<Airport[]> {

  const response = await apiClient.get(
    "/aeropuertos/"
  );

  console.log("AEROPUERTOS API:", response.data);

  return response.data.results;

}
};