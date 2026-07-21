// reservation.service.ts

import { apiClient } from '../http/axios-client'

export const reservationService = {

  async getAll() {

    const { data } = await apiClient.get(
      '/reservas/'
    )

    return Array.isArray(data)
      ? data
      : data.results
  },

  async create(
    vuelo: number,
    cantidad_pasajeros: number
  ) {

    const { data } = await apiClient.post(
      '/reservas/',
      {
        vuelo,
        cantidad_pasajeros
      }
    )

    return data
  }
}