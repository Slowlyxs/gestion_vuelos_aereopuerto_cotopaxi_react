import { create } from 'zustand'

import type { Flight } from '@/domain/entities/flight.entity'

import { flightFactory } from '@/infrastructure/factories/flight.factory'

interface FlightState {
  flights: Flight[]
  isLoading: boolean
  error: string | null

  loadFlights(): Promise<void>
}

export const useFlightStore = create<FlightState>((set) => ({
  flights: [],
  isLoading: false,
  error: null,

  async loadFlights() {
    try {
      set({
        isLoading: true,
        error: null,
      })

      const flights = await flightFactory.getAll()

      set({
        flights,
        isLoading: false,
      })
    } catch (error) {
      console.error(error)

      set({
        error: 'No se pudieron cargar los vuelos',
        isLoading: false,
      })
    }
  },
}))