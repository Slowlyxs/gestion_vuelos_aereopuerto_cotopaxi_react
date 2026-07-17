import { create } from 'zustand'

import type { Pilot } from '@/domain/entities/pilot.entity'

import { pilotFactory } from '@/infrastructure/factories/pilot.factory'

interface PilotState {
  pilots: Pilot[]
  isLoading: boolean
  error: string | null

  loadPilots(): Promise<void>
}

export const usePilotStore = create<PilotState>((set) => ({
  pilots: [],
  isLoading: false,
  error: null,

  async loadPilots() {
    try {
      set({
        isLoading: true,
        error: null,
      })

      const pilots = await pilotFactory.getAll()

      set({
        pilots,
        isLoading: false,
      })
    } catch (error) {
      console.error(error)

      set({
        error: 'No se pudieron cargar los pilotos',
        isLoading: false,
      })
    }
  },
}))