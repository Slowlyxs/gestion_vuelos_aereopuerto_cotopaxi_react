import { apiClient } from "../http/axios-client";

import type { FlightStatusHistory } from "@/domain/entities/flight-status-history.entity";

export const flightStatusHistoryService = {

  async getAll(): Promise<FlightStatusHistory[]> {

    const response = await apiClient.get("/historial-estados-vuelo/");

    const data = response.data;

    return Array.isArray(data)
      ? data
      : data.results ?? [];

  }

};