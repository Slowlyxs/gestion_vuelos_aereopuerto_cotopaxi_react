import { apiClient } from '../http/axios-client'

import type { Incident } from '@/domain/entities/incident.entity'

export const incidentService = {
  async getAll(): Promise<Incident[]> {
    const response = await apiClient.get('/incidentes/')

    const data = response.data

    return Array.isArray(data)
      ? data
      : data.results ?? []
  },
}