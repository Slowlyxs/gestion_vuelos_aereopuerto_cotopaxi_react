import { apiClient } from '../http/axios-client'

import type { Route } from '@/domain/entities/route.entity'

export const routeService = {
  async getAll(): Promise<Route[]> {
    const response = await apiClient.get('/rutas/')

    const data = response.data

    return Array.isArray(data)
      ? data
      : data.results ?? []
  },
}