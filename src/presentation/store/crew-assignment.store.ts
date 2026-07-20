import { create } from 'zustand'

import type {
  CrewAssignment,
  CrewAssignmentPayload,
} from '@/domain/entities/crew-assignment.entity'

import { crewAssignmentFactory } from '@/infrastructure/factories/crew-assignment.factory'

interface CrewAssignmentState {
  crewAssignments: CrewAssignment[]

  isLoading: boolean
  isSaving: boolean
  deletingId: number | null

  error: string | null

  loadCrewAssignments(): Promise<void>

  createCrewAssignment(
    payload: CrewAssignmentPayload,
  ): Promise<void>

  updateCrewAssignment(
    id: number,
    payload: CrewAssignmentPayload,
  ): Promise<void>

  deleteCrewAssignment(id: number): Promise<void>

  clearError(): void
}

export const useCrewAssignmentStore =
  create<CrewAssignmentState>((set, get) => ({
    crewAssignments: [],

    isLoading: false,
    isSaving: false,
    deletingId: null,

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
          isLoading: false,
          error:
            'No se pudieron cargar las asignaciones de tripulación.',
        })
      }
    },

    async createCrewAssignment(payload) {
      try {
        set({
          isSaving: true,
          error: null,
        })

        await crewAssignmentFactory.create(payload)

        await get().loadCrewAssignments()

        set({
          isSaving: false,
        })
      } catch (error) {
        console.error(error)

        set({
          isSaving: false,
          error:
            'No se pudo crear la asignación de tripulación.',
        })

        throw error
      }
    },

    async updateCrewAssignment(id, payload) {
      try {
        set({
          isSaving: true,
          error: null,
        })

        await crewAssignmentFactory.update(id, payload)

        await get().loadCrewAssignments()

        set({
          isSaving: false,
        })
      } catch (error) {
        console.error(error)

        set({
          isSaving: false,
          error:
            'No se pudo actualizar la asignación de tripulación.',
        })

        throw error
      }
    },

    async deleteCrewAssignment(id) {
      try {
        set({
          deletingId: id,
          error: null,
        })

        await crewAssignmentFactory.remove(id)

        set((state) => ({
          crewAssignments: state.crewAssignments.filter(
            (assignment) =>
              assignment.id_asignacion !== id,
          ),
          deletingId: null,
        }))
      } catch (error) {
        console.error(error)

        set({
          deletingId: null,
          error:
            'No se pudo eliminar la asignación de tripulación.',
        })

        throw error
      }
    },

    clearError() {
      set({
        error: null,
      })
    },
  }))