import { apiClient } from '../http/axios-client'

import type {
  CrewAssignment,
  CrewAssignmentPayload,
} from '@/domain/entities/crew-assignment.entity'

interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export const crewAssignmentService = {
  async getAll(): Promise<CrewAssignment[]> {
    const response = await apiClient.get<
      PaginatedResponse<CrewAssignment> | CrewAssignment[]
    >('/asignacion-tripulacion/')

    const data = response.data

    return Array.isArray(data)
      ? data
      : data.results ?? []
  },

  async create(
    payload: CrewAssignmentPayload,
  ): Promise<CrewAssignment> {
    const response = await apiClient.post<CrewAssignment>(
      '/asignacion-tripulacion/',
      payload,
    )

    return response.data
  },

  async update(
    id: number,
    payload: CrewAssignmentPayload,
  ): Promise<CrewAssignment> {
    const response = await apiClient.patch<CrewAssignment>(
      `/asignacion-tripulacion/${id}/`,
      payload,
    )

    return response.data
  },

  async remove(id: number): Promise<void> {
    await apiClient.delete(
      `/asignacion-tripulacion/${id}/`,
    )
  },
}