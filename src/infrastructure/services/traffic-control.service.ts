import { apiClient } from "../http/axios-client";

import type { TrafficControl } from "@/domain/entities/traffic-control.entity";

export const trafficControlService = {

  async getAll(): Promise<TrafficControl[]> {

    const response = await apiClient.get("/controles-trafico/");

    const data = response.data;

    return Array.isArray(data)
      ? data
      : data.results ?? [];

  }

};