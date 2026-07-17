import { apiClient } from '../http/axios-client'

import type { Terminal } from '@/domain/entities/terminal.entity'


export const terminalService = {

  async getAll(): Promise<Terminal[]> {

    const response = await apiClient.get('/terminales/')

    const data = response.data

    return Array.isArray(data)
      ? data
      : data.results ?? []

  },

}