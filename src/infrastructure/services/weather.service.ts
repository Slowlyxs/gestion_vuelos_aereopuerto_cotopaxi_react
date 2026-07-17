import { apiClient } from "../http/axios-client";

import type { Weather } from "@/domain/entities/weather.entity";

export const weatherService = {

  async getAll(): Promise<Weather[]> {

    const response = await apiClient.get("/Clima/");

    const data = response.data;

    return Array.isArray(data)
      ? data
      : data.results ?? [];

  }

};