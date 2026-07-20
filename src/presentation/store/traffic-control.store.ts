import { create } from 'zustand'

import type {
  TrafficControl,
  TrafficControlPayload,
} from '@/domain/entities/traffic-control.entity'

import { trafficControlFactory } from '@/infrastructure/factories/traffic-control.factory'

interface TrafficControlState {
  trafficControls: TrafficControl[]

  isLoading: boolean
  isSaving: boolean
  deletingId: number | null

  error: string | null

  loadTrafficControls(): Promise<void>

  createTrafficControl(
    payload: TrafficControlPayload,
  ): Promise<void>

  updateTrafficControl(
    id: number,
    payload: TrafficControlPayload,
  ): Promise<void>

  deleteTrafficControl(id: number): Promise<void>

  clearError(): void
}

export const useTrafficControlStore =
  create<TrafficControlState>((set) => ({
    trafficControls: [],

    isLoading: false,
    isSaving: false,
    deletingId: null,

    error: null,

    async loadTrafficControls() {
      try {
        set({
          isLoading: true,
          error: null,
        })

        const trafficControls =
          await trafficControlFactory.getAll()

        set({
          trafficControls,
          isLoading: false,
        })
      } catch (error) {
        console.error(error)

        set({
          isLoading: false,
          error:
            'No se pudieron cargar los controles de tráfico.',
        })
      }
    },

    async createTrafficControl(payload) {
      try {
        set({
          isSaving: true,
          error: null,
        })

        const createdControl =
          await trafficControlFactory.create(payload)

        set((state) => ({
          trafficControls: [
            createdControl,
            ...state.trafficControls,
          ],
          isSaving: false,
        }))
      } catch (error) {
        console.error(error)

        set({
          isSaving: false,
          error:
            'No se pudo crear el control de tráfico.',
        })

        throw error
      }
    },

    async updateTrafficControl(id, payload) {
      try {
        set({
          isSaving: true,
          error: null,
        })

        const updatedControl =
          await trafficControlFactory.update(
            id,
            payload,
          )

        set((state) => ({
          trafficControls: state.trafficControls.map(
            (control) =>
              control.id === id
                ? updatedControl
                : control,
          ),
          isSaving: false,
        }))
      } catch (error) {
        console.error(error)

        set({
          isSaving: false,
          error:
            'No se pudo actualizar el control de tráfico.',
        })

        throw error
      }
    },

    async deleteTrafficControl(id) {
      try {
        set({
          deletingId: id,
          error: null,
        })

        await trafficControlFactory.remove(id)

        set((state) => ({
          trafficControls:
            state.trafficControls.filter(
              (control) => control.id !== id,
            ),
          deletingId: null,
        }))
      } catch (error) {
        console.error(error)

        set({
          deletingId: null,
          error:
            'No se pudo eliminar el control de tráfico.',
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