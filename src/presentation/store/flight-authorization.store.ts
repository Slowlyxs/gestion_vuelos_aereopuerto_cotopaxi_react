import { create } from 'zustand'

import type { FlightAuthorization } from '@/domain/entities/flight-authorization.entity'

import { flightAuthorizationFactory } from '@/infrastructure/factories/flight-authorization.factory'

interface FlightAuthorizationState {
  authorizations: FlightAuthorization[]
  isLoading: boolean
  error: string | null

  loadAuthorizations(): Promise<void>
}

export const useFlightAuthorizationStore =
  create<FlightAuthorizationState>((set) => ({
    authorizations: [],
    isLoading: false,
    error: null,

    async loadAuthorizations() {
      try {
        set({
          isLoading: true,
          error: null,
        })

        const authorizations =
          await flightAuthorizationFactory.getAll()

        set({
          authorizations,
          isLoading: false,
        })
      } catch (error) {
        console.error(error)

        set({
          error: 'No se pudieron cargar las autorizaciones',
          isLoading: false,
        })
      }
    },
  }))