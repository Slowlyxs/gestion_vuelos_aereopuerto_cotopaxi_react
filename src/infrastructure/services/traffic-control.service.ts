import { apiClient } from '../http/axios-client'

import type {
  TrafficControl,
  TrafficControlPayload,
} from '@/domain/entities/traffic-control.entity'

interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export const trafficControlService = {
  async getAll(): Promise<TrafficControl[]> {
    const response = await apiClient.get<
      PaginatedResponse<TrafficControl> | TrafficControl[]
    >('/controles-trafico/')

    const data = response.data

    return Array.isArray(data)
      ? data
      : data.results ?? []
  },

  async create(
    payload: TrafficControlPayload,
  ): Promise<TrafficControl> {
    const response = await apiClient.post<TrafficControl>(
      '/controles-trafico/',
      payload,
    )

    return response.data
  },

  async update(
    id: number,
    payload: TrafficControlPayload,
  ): Promise<TrafficControl> {
    const response = await apiClient.patch<TrafficControl>(
      `/controles-trafico/${id}/`,
      payload,
    )

    return response.data
  },

  async remove(id: number): Promise<void> {
    await apiClient.delete(
      `/controles-trafico/${id}/`,
    )
  },
}