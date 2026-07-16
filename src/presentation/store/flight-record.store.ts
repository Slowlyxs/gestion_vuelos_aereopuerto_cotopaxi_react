import { create } from 'zustand'

import type { FlightRecord } from '@/domain/entities/flight-record.entity'

import { flightRecordFactory } from '@/infrastructure/factories/flight-record.factory'

interface FlightRecordState {
  flightRecords: FlightRecord[]
  isLoading: boolean
  error: string | null

  loadFlightRecords(): Promise<void>
}

export const useFlightRecordStore = create<FlightRecordState>((set) => ({
  flightRecords: [],
  isLoading: false,
  error: null,

  async loadFlightRecords() {
    try {
      set({
        isLoading: true,
        error: null,
      })

      const flightRecords = await flightRecordFactory.getAll()

      set({
        flightRecords,
        isLoading: false,
      })
    } catch (error) {
      console.error(error)

      set({
        error: 'No se pudieron cargar los registros de vuelo',
        isLoading: false,
      })
    }
  },
}))