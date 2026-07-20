import { apiClient } from '../http/axios-client'

import type {
  Airline,
  AirlinePayload,
} from '@/domain/entities/airline.entity'

interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

function createAirlineFormData(
  payload: AirlinePayload,
): FormData {
  const formData = new FormData()

  formData.append('nombre', payload.nombre)
  formData.append('pais', payload.pais)

  if (payload.image instanceof File) {
    formData.append('image', payload.image)
  }

  return formData
}

export const airlineService = {
  async getAll(): Promise<Airline[]> {
    const response = await apiClient.get<
      PaginatedResponse<Airline> | Airline[]
    >('/aerolineas/')

    const data = response.data

    return Array.isArray(data)
      ? data
      : data.results ?? []
  },

  async create(
    payload: AirlinePayload,
  ): Promise<Airline> {
    const formData = createAirlineFormData(payload)

    const response = await apiClient.post<Airline>(
      '/aerolineas/',
      formData,
    )

    return response.data
  },

  async update(
    id: number,
    payload: AirlinePayload,
  ): Promise<Airline> {
    const formData = createAirlineFormData(payload)

    const response = await apiClient.patch<Airline>(
      `/aerolineas/${id}/`,
      formData,
    )

    return response.data
  },

  async remove(id: number): Promise<void> {
    await apiClient.delete(`/aerolineas/${id}/`)
  },
}