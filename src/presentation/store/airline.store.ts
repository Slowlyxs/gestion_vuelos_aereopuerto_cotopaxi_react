import { create } from 'zustand'

import type {
  Airline,
  AirlinePayload,
} from '@/domain/entities/airline.entity'

import { airlineFactory } from '@/infrastructure/factories/airline.factory'

interface AirlineState {
  airlines: Airline[]

  isLoading: boolean
  isSaving: boolean
  deletingId: number | null

  error: string | null

  loadAirlines(): Promise<void>

  createAirline(
    payload: AirlinePayload,
  ): Promise<void>

  updateAirline(
    id: number,
    payload: AirlinePayload,
  ): Promise<void>

  deleteAirline(id: number): Promise<void>

  clearError(): void
}

export const useAirlineStore = create<AirlineState>(
  (set) => ({
    airlines: [],

    isLoading: false,
    isSaving: false,
    deletingId: null,

    error: null,

    async loadAirlines() {
      try {
        set({
          isLoading: true,
          error: null,
        })

        const airlines = await airlineFactory.getAll()

        set({
          airlines,
          isLoading: false,
        })
      } catch (error) {
        console.error(error)

        set({
          isLoading: false,
          error:
            'No se pudieron cargar las aerolíneas.',
        })
      }
    },

    async createAirline(payload) {
      try {
        set({
          isSaving: true,
          error: null,
        })

        const createdAirline =
          await airlineFactory.create(payload)

        set((state) => ({
          airlines: [
            createdAirline,
            ...state.airlines,
          ],
          isSaving: false,
        }))
      } catch (error) {
        console.error(error)

        set({
          isSaving: false,
          error:
            'No se pudo crear la aerolínea.',
        })

        throw error
      }
    },

    async updateAirline(id, payload) {
      try {
        set({
          isSaving: true,
          error: null,
        })

        const updatedAirline =
          await airlineFactory.update(id, payload)

        set((state) => ({
          airlines: state.airlines.map((airline) =>
            airline.id_aerolinea === id
              ? updatedAirline
              : airline,
          ),
          isSaving: false,
        }))
      } catch (error) {
        console.error(error)

        set({
          isSaving: false,
          error:
            'No se pudo actualizar la aerolínea.',
        })

        throw error
      }
    },

    async deleteAirline(id) {
      try {
        set({
          deletingId: id,
          error: null,
        })

        await airlineFactory.remove(id)

        set((state) => ({
          airlines: state.airlines.filter(
            (airline) =>
              airline.id_aerolinea !== id,
          ),
          deletingId: null,
        }))
      } catch (error) {
        console.error(error)

        set({
          deletingId: null,
          error:
            'No se pudo eliminar la aerolínea. Puede tener aviones o vuelos relacionados.',
        })

        throw error
      }
    },

    clearError() {
      set({
        error: null,
      })
    },
  }),
)