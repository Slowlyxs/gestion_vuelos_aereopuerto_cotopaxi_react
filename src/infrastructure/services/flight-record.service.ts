import { apiClient } from '../http/axios-client'

import type { FlightRecord } from '@/domain/entities/flight-record.entity'

export const flightRecordService = {
  async getAll(): Promise<FlightRecord[]> {
    const response = await apiClient.get('/registros-vuelo/')

    const data = response.data

    return Array.isArray(data)
      ? data
      : data.results ?? []
  },
}