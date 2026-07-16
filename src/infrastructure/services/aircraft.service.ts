import { apiClient } from "../http/axios-client";

import type { Aircraft } from "@/domain/entities/aircraft.entity";

export const aircraftService = {

  async getAll(): Promise<Aircraft[]> {

    const response = await apiClient.get("/aviones/");

    const data = response.data;

    return Array.isArray(data)
      ? data
      : data.results ?? [];

  }

};