import { apiClient } from '../http/axios-client'

import type {
  Terminal,
  TerminalPayload,
} from '@/domain/entities/terminal.entity'

interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export const terminalService = {
  async getAll(): Promise<Terminal[]> {
    const response = await apiClient.get<
      PaginatedResponse<Terminal> | Terminal[]
    >('/terminales/')

    const data = response.data

    return Array.isArray(data)
      ? data
      : data.results ?? []
  },

  async create(
    payload: TerminalPayload,
  ): Promise<Terminal> {
    const response = await apiClient.post<Terminal>(
      '/terminales/',
      payload,
    )

    return response.data
  },

  async update(
    id: number,
    payload: TerminalPayload,
  ): Promise<Terminal> {
    const response = await apiClient.patch<Terminal>(
      `/terminales/${id}/`,
      payload,
    )

    return response.data
  },

  async remove(id: number): Promise<void> {
    await apiClient.delete(`/terminales/${id}/`)
  },
}   