import { apiClient } from '../http/axios-client'

import type { ControlTower } from '@/domain/entities/control-tower.entity'

export const controlTowerService = {
  async getAll(): Promise<ControlTower[]> {
    const response = await apiClient.get('/torres-control/')

    const data = response.data

    return Array.isArray(data)
      ? data
      : data.results ?? []
  },
}