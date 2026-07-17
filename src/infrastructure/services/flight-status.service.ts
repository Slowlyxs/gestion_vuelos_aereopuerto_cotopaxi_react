import { apiClient } from "../http/axios-client";

import type { FlightStatus } from "@/domain/entities/flight-status.entity";

export const flightStatusService = {

  async getAll(): Promise<FlightStatus[]> {

    const response = await apiClient.get("/Estado_vuelo/");

    const data = response.data;

    return Array.isArray(data)
      ? data
      : data.results ?? [];

  }

};