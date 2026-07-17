import { apiClient } from '../http/axios-client'

import type { Gate } from '@/domain/entities/boarding-gate.entity';


export const gateService = {

  async getAll(): Promise<Gate[]> {

    const response = await apiClient.get('/puertas-embarque/')

    const data = response.data

    return Array.isArray(data)
      ? data
      : data.results ?? []

  },

}