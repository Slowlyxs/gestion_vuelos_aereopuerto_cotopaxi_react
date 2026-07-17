import { apiClient } from '../http/axios-client'

import type { Flight } from '@/domain/entities/flight.entity'

export const flightService = {
  async getAll(): Promise<Flight[]> {
    const response = await apiClient.get('/vuelos/')

    const data = response.data

    return Array.isArray(data)
      ? data
      : data.results ?? []
  },
}