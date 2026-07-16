import { apiClient } from '../http/axios-client'

import type { Pilot } from '@/domain/entities/pilot.entity'

export const pilotService = {
  async getAll(): Promise<Pilot[]> {
    const response = await apiClient.get('/pilotos/')

    const data = response.data

    return Array.isArray(data)
      ? data
      : data.results ?? []
  },
}