import { apiClient } from '../http/axios-client'

import type { FlightAuthorization } from '@/domain/entities/flight-authorization.entity'

export const flightAuthorizationService = {
  async getAll(): Promise<FlightAuthorization[]> {
    const response = await apiClient.get('/autorizaciones-vuelo/')

    const data = response.data

    return Array.isArray(data)
      ? data
      : data.results ?? []
  },
}