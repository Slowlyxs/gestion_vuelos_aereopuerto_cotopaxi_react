// reservation.store.ts

import { create } from 'zustand'

import { reservationFactory } from '@/infrastructure/factories/reservation.factory'

export const useReservationStore = create(
  (set) => ({

    reservations: [],

    isLoading: false,

    async loadReservations() {

      set({
        isLoading: true
      })

      const reservations =
        await reservationFactory.getAll()

      set({
        reservations,
        isLoading: false
      })
    },

    async createReservation(
      vueloId: number,
      pasajeros: number
    ) {

      await reservationFactory.create(
        vueloId,
        pasajeros
      )
    }
  })
)