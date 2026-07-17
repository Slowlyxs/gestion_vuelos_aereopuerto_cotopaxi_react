import { apiClient } from '../http/axios-client'

import type { Maintenance } from '@/domain/entities/maintenance.entity'

export const maintenanceService = {
  async getAll(): Promise<Maintenance[]> {
    const response = await apiClient.get('/mantenimientos/')

    const data = response.data

    return Array.isArray(data)
      ? data
      : data.results ?? []
  },
}