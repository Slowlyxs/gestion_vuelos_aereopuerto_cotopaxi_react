import { create } from 'zustand'

import type { ControlTower } from '@/domain/entities/control-tower.entity'

import { controlTowerFactory } from '@/infrastructure/factories/control-tower.factory'

interface ControlTowerState {
  controlTowers: ControlTower[]
  isLoading: boolean
  error: string | null

  loadControlTowers(): Promise<void>
}

export const useControlTowerStore = create<ControlTowerState>((set) => ({
  controlTowers: [],
  isLoading: false,
  error: null,

  async loadControlTowers() {
    try {
      set({
        isLoading: true,
        error: null,
      })

      const controlTowers = await controlTowerFactory.getAll()

      set({
        controlTowers,
        isLoading: false,
      })
    } catch (error) {
      console.error(error)

      set({
        error: 'No se pudieron cargar las torres de control',
        isLoading: false,
      })
    }
  },
}))