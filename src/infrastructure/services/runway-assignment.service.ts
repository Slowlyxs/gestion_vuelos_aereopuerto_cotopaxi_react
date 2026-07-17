import { apiClient } from '../http/axios-client'

import type { RunwayAssignment } from '@/domain/entities/runway-assignment.entity'

export const runwayAssignmentService = {
  async getAll(): Promise<RunwayAssignment[]> {
    const response = await apiClient.get('/asignacion-pista/')

    const data = response.data

    return Array.isArray(data)
      ? data
      : data.results ?? []
  },
}