import { create } from 'zustand'

import type { CrewAssignment } from '@/domain/entities/crew-assignment.entity'

import { crewAssignmentFactory } from '@/infrastructure/factories/crew-assignment.factory'

interface CrewAssignmentState {
  crewAssignments: CrewAssignment[]
  isLoading: boolean
  error: string | null

  loadCrewAssignments(): Promise<void>
}

export const useCrewAssignmentStore =
  create<CrewAssignmentState>((set) => ({
    crewAssignments: [],
    isLoading: false,
    error: null,

    async loadCrewAssignments() {
      try {
        set({
          isLoading: true,
          error: null,
        })

        const crewAssignments =
          await crewAssignmentFactory.getAll()

        set({
          crewAssignments,
          isLoading: false,
        })
      } catch (error) {
        console.error(error)

        set({
          error: 'No se pudieron cargar las asignaciones',
          isLoading: false,
        })
      }
    },
  }))