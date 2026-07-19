import { apiClient } from '../http/axios-client'
import type { Crew } from '@/domain/entities/crew.entity'

export const crewService = {
  async getAll(): Promise<Crew[]> {
    const response = await apiClient.get('/tripulacion/')

    const data = response.data

    return Array.isArray(data)
      ? data
      : data.results ?? []
  },
}