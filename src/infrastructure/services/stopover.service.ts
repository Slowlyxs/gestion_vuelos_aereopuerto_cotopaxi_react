import { apiClient } from "../http/axios-client";

import type { Stopover } from "@/domain/entities/stopover.entity";

export const stopoverService = {

  async getAll(): Promise<Stopover[]> {

    const response = await apiClient.get("/escalas/");

    const data = response.data;

    return Array.isArray(data)
      ? data
      : data.results ?? [];

  }

};