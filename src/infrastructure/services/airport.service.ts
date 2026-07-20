import { apiClient } from '../http/axios-client'

import type {
  Airport,
  AirportPayload,
} from '@/domain/entities/airport.entity'

interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

function createAirportFormData(
  payload: AirportPayload,
): FormData {
  const formData = new FormData()

  formData.append('nombre', payload.nombre)
  formData.append('ciudad', payload.ciudad)
  formData.append('pais', payload.pais)
  formData.append(
    'codigo_iata',
    payload.codigo_iata.toUpperCase(),
  )

  if (payload.image instanceof File) {
    formData.append('image', payload.image)
  }

  return formData
}

export const airportService = {
  async getAll(): Promise<Airport[]> {
    const response = await apiClient.get<
      PaginatedResponse<Airport> | Airport[]
    >('/aeropuertos/')

    const data = response.data

    return Array.isArray(data)
      ? data
      : data.results ?? []
  },

  async create(
    payload: AirportPayload,
  ): Promise<Airport> {
    const formData = createAirportFormData(payload)

    const response = await apiClient.post<Airport>(
      '/aeropuertos/',
      formData,
    )

    return response.data
  },

  async update(
    id: number,
    payload: AirportPayload,
  ): Promise<Airport> {
    const formData = createAirportFormData(payload)

    const response = await apiClient.patch<Airport>(
      `/aeropuertos/${id}/`,
      formData,
    )

    return response.data
  },

  async remove(id: number): Promise<void> {
    await apiClient.delete(`/aeropuertos/${id}/`)
  },
}