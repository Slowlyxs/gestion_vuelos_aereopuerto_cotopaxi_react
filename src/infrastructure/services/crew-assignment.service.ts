import { apiClient } from '../http/axios-client'

import type { CrewAssignment } from '@/domain/entities/crew-assignment.entity'

export const crewAssignmentService = {
  async getAll(): Promise<CrewAssignment[]> {
    const response = await apiClient.get('/asignacion-tripulacion/')

    const data = response.data

    return Array.isArray(data)
      ? data
      : data.results ?? []
  },
}