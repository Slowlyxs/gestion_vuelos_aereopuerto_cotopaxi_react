import { apiClient } from "../http/axios-client";

import type { Schedule } from "@/domain/entities/schedule.entity";

export const scheduleService = {

  async getAll(): Promise<Schedule[]> {

    const response = await apiClient.get("/horarios/");

    const data = response.data;

    return Array.isArray(data)
      ? data
      : data.results ?? [];

  }

};