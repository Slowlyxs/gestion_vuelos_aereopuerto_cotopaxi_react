import { apiClient } from '../http/axios-client'

import type { Runway } from '@/domain/entities/runway.entity'

export const runwayService = {
  async getAll(): Promise<Runway[]> {
    const response = await apiClient.get('/pistas/')

    const data = response.data

    return Array.isArray(data)
      ? data
      : data.results ?? []
  },
}