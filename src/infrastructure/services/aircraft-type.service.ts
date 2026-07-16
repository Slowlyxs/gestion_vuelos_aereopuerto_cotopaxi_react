import { apiClient } from "../http/axios-client";

import type { AircraftType } from "@/domain/entities/aircraft-type.entity";

export const aircraftTypeService = {

  async getAll(): Promise<AircraftType[]> {

    const response = await apiClient.get("/tipos-avion/");

    const data = response.data;

    return Array.isArray(data)
      ? data
      : data.results ?? [];

  }

};