import { apiClient } from "../http/axios-client";

import type { Airline } from "@/domain/entities/airline.entity";

export const airlineService = {

  async getAll(): Promise<Airline[]> {

    const response = await apiClient.get("/aerolineas/");

    const data = response.data;

    return Array.isArray(data)
      ? data
      : data.results ?? [];

  }

};