import { create } from 'zustand'

import type { Runway } from '@/domain/entities/runway.entity'

import { runwayFactory } from '@/infrastructure/factories/runway.factory'

interface RunwayState {
  runways: Runway[]
  isLoading: boolean
  error: string | null

  loadRunways(): Promise<void>
}

export const useRunwayStore = create<RunwayState>((set) => ({
  runways: [],
  isLoading: false,
  error: null,

  async loadRunways() {
    try {
      set({
        isLoading: true,
        error: null,
      })

      const runways = await runwayFactory.getAll()

      set({
        runways,
        isLoading: false,
      })
    } catch (error) {
      console.error(error)

      set({
        error: 'No se pudieron cargar las pistas',
        isLoading: false,
      })
    }
  },
}))