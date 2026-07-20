import { create } from 'zustand'

import type {
  Airport,
  AirportPayload,
} from '@/domain/entities/airport.entity'

import { airportFactory } from '@/infrastructure/factories/airport.factory'

interface AirportState {
  airports: Airport[]

  isLoading: boolean
  isSaving: boolean
  deletingId: number | null

  error: string | null

  loadAirports(): Promise<void>

  createAirport(
    payload: AirportPayload,
  ): Promise<void>

  updateAirport(
    id: number,
    payload: AirportPayload,
  ): Promise<void>

  deleteAirport(id: number): Promise<void>

  clearError(): void
}

export const useAirportStore = create<AirportState>(
  (set) => ({
    airports: [],

    isLoading: false,
    isSaving: false,
    deletingId: null,

    error: null,

    async loadAirports() {
      try {
        set({
          isLoading: true,
          error: null,
        })

        const airports = await airportFactory.getAll()

        set({
          airports,
          isLoading: false,
        })
      } catch (error) {
        console.error(error)

        set({
          isLoading: false,
          error:
            'No se pudieron cargar los aeropuertos.',
        })
      }
    },

    async createAirport(payload) {
      try {
        set({
          isSaving: true,
          error: null,
        })

        const createdAirport =
          await airportFactory.create(payload)

        set((state) => ({
          airports: [
            createdAirport,
            ...state.airports,
          ],
          isSaving: false,
        }))
      } catch (error) {
        console.error(error)

        set({
          isSaving: false,
          error:
            'No se pudo crear el aeropuerto.',
        })

        throw error
      }
    },

    async updateAirport(id, payload) {
      try {
        set({
          isSaving: true,
          error: null,
        })

        const updatedAirport =
          await airportFactory.update(id, payload)

        set((state) => ({
          airports: state.airports.map((airport) =>
            airport.id_aeropuerto === id
              ? updatedAirport
              : airport,
          ),
          isSaving: false,
        }))
      } catch (error) {
        console.error(error)

        set({
          isSaving: false,
          error:
            'No se pudo actualizar el aeropuerto.',
        })

        throw error
      }
    },

    async deleteAirport(id) {
      try {
        set({
          deletingId: id,
          error: null,
        })

        await airportFactory.remove(id)

        set((state) => ({
          airports: state.airports.filter(
            (airport) =>
              airport.id_aeropuerto !== id,
          ),
          deletingId: null,
        }))
      } catch (error) {
        console.error(error)

        set({
          deletingId: null,
          error:
            'No se pudo eliminar el aeropuerto. Puede tener registros relacionados.',
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