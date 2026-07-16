import { apiClient } from '../http/axios-client'

import type { BoardingGate } from '@/domain/entities/boarding-gate.entity'

export const boardingGateService = {
  async getAll(): Promise<BoardingGate[]> {
    const response = await apiClient.get('/puertas-embarque/')

    const data = response.data

    return Array.isArray(data)
      ? data
      : data.results ?? []
  },
}