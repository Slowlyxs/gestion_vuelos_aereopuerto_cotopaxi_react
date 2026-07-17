import { create } from 'zustand'

import type { RunwayAssignment } from '@/domain/entities/runway-assignment.entity'

import { runwayAssignmentFactory } from '@/infrastructure/factories/runway-assignment.factory'

interface RunwayAssignmentState {
  runwayAssignments: RunwayAssignment[]
  isLoading: boolean
  error: string | null

  loadRunwayAssignments(): Promise<void>
}

export const useRunwayAssignmentStore =
  create<RunwayAssignmentState>((set) => ({
    runwayAssignments: [],
    isLoading: false,
    error: null,

    async loadRunwayAssignments() {
      try {
        set({
          isLoading: true,
          error: null,
        })

        const runwayAssignments =
          await runwayAssignmentFactory.getAll()

        set({
          runwayAssignments,
          isLoading: false,
        })
      } catch (error) {
        console.error(error)

        set({
          error: 'No se pudieron cargar las asignaciones de pista',
          isLoading: false,
        })
      }
    },
  }))