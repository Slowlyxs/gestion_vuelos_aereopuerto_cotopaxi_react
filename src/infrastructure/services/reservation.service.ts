import { apiClient } from '../http/axios-client'

import type {
  Reservation,
  CreateReservationPayload,
} from '@/domain/entities/reservation.entity'

export const reservationService = {
  async getAll(): Promise<Reservation[]> {
    const response = await apiClient.get('/reservas/')

    const data = response.data

    return Array.isArray(data)
      ? data
      : data.results ?? []
  },

  async create(
    vuelo: number,
    cantidad: number,
  ): Promise<Reservation> {
    const payload: CreateReservationPayload = {
      vuelo,
      cantidad_pasajeros: cantidad,
    }

    const response = await apiClient.post(
      '/reservas/',
      payload,
    )

    return response.data
  },
}