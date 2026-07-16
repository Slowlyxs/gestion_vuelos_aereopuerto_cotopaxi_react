import { create } from 'zustand'

import type { Maintenance } from '@/domain/entities/maintenance.entity'

import { maintenanceFactory } from '@/infrastructure/factories/maintenance.factory'

interface MaintenanceState {
  maintenances: Maintenance[]
  isLoading: boolean
  error: string | null

  loadMaintenances(): Promise<void>
}

export const useMaintenanceStore = create<MaintenanceState>((set) => ({
  maintenances: [],
  isLoading: false,
  error: null,

  async loadMaintenances() {
    try {
      set({
        isLoading: true,
        error: null,
      })

      const maintenances = await maintenanceFactory.getAll()

      set({
        maintenances,
        isLoading: false,
      })
    } catch (error) {
      console.error(error)

      set({
        error: 'No se pudieron cargar los mantenimientos',
        isLoading: false,
      })
    }
  },
}))