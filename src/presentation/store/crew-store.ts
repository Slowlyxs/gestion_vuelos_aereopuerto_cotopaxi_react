import { create } from 'zustand'

import type { Crew } from '@/domain/entities/crew.entity'

import { crewFactory } from '@/infrastructure/factories/crew.factory'

interface CrewState {
  crews: Crew[]
  isLoading: boolean
  error: string | null

  loadCrews(): Promise<void>
}

export const useCrewStore = create<CrewState>((set) => ({
  crews: [],
  isLoading: false,
  error: null,

  async loadCrews() {
    try {
      set({
        isLoading: true,
        error: null,
      })

      const crews = await crewFactory.getAll()

      set({
        crews,
        isLoading: false,
      })
    } catch (error) {
      console.error(error)

      set({
        error: 'No se pudieron cargar las tripulaciones',
        isLoading: false,
      })
    }
  },
}))