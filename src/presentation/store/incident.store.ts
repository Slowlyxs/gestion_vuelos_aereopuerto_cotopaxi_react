import { create } from 'zustand'

import type { Incident } from '@/domain/entities/incident.entity'

import { incidentFactory } from '@/infrastructure/factories/incident.factory'

interface IncidentState {
  incidents: Incident[]
  isLoading: boolean
  error: string | null

  loadIncidents(): Promise<void>
}

export const useIncidentStore = create<IncidentState>((set) => ({
  incidents: [],
  isLoading: false,
  error: null,

  async loadIncidents() {
    try {
      set({
        isLoading: true,
        error: null,
      })

      const incidents = await incidentFactory.getAll()

      set({
        incidents,
        isLoading: false,
      })
    } catch (error) {
      console.error(error)

      set({
        error: 'No se pudieron cargar los incidentes',
        isLoading: false,
      })
    }
  },
}))