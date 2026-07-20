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
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    )

    return response.data
  },

  async update(
    id: number,
    payload: AirportPayload,
  ): Promise<Airport> {
    const formData = createAirportFormData(payload)

    console.log('=== DATOS ENVIADOS ===')

    for (const [key, value] of formData.entries()) {
      console.log(key, value)
    }

    try {
      const response = await apiClient.patch<Airport>(
        `/aeropuertos/${id}/`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )

      return response.data
    } catch (error: any) {
      console.log('=== ERROR COMPLETO ===')
      console.log('STATUS:', error.response?.status)
      console.log('DATA:', error.response?.data)
      console.log('HEADERS:', error.config?.headers)

      throw error
    }
  },

  async remove(id: number): Promise<void> {
    await apiClient.delete(`/aeropuertos/${id}/`)
  },
}