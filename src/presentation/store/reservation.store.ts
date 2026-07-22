import { create } from 'zustand'

import type { Reservation } from '@/domain/entities/reservation.entity'

import { getReservationsUseCase } from '@/application/use-cases/get-reservations.usecase'
import { createReservationUseCase } from '@/application/use-cases/create-reservation.usecase'

interface ReservationState {
  reservations: Reservation[]

  isLoading: boolean
  isCreating: boolean
  error: string | null

  loadMyReservations(): Promise<void>

  createReservation(data: {
    vuelo: number
    cantidad_pasajeros: number
  }): Promise<void>

  clearError(): void
}

function extractErrorMessage(error: unknown, fallback: string): string {
  const apiErr = error as { detail?: string; message?: string }
  return apiErr?.detail ?? apiErr?.message ?? fallback
}

export const useReservationStore = create<ReservationState>(
  (set) => ({
    reservations: [],

    isLoading: false,
    isCreating: false,
    error: null,

    async loadMyReservations() {
      try {
        set({ isLoading: true, error: null })

        const reservations = await getReservationsUseCase()

        set({ reservations, isLoading: false })
      } catch (error) {
        console.error(error)

        set({
          isLoading: false,
          error: extractErrorMessage(error, 'No se pudieron cargar tus reservas.'),
        })
      }
    },

    async createReservation(data) {
      try {
        set({ isCreating: true, error: null })

        const reservation = await createReservationUseCase(
          data.vuelo,
          data.cantidad_pasajeros,
        )

        set((state) => ({
          reservations: [reservation, ...state.reservations],
          isCreating: false,
        }))
      } catch (error) {
        console.error(error)

        const message = extractErrorMessage(error, 'No se pudo realizar la reserva.')

        set({
          isCreating: false,
          error: message,
        })

        throw new Error(message)
      }
    },

    clearError() {
      set({ error: null })
    },
  }),
)