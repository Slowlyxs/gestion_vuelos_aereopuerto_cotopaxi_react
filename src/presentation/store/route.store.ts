import { create } from 'zustand'

import type { Route } from '@/domain/entities/route.entity'

import { routeFactory } from '@/infrastructure/factories/route.factory'

interface RouteState {
  routes: Route[]
  isLoading: boolean
  error: string | null

  loadRoutes(): Promise<void>
}

export const useRouteStore = create<RouteState>((set) => ({
  routes: [],
  isLoading: false,
  error: null,

  async loadRoutes() {
    try {
      set({
        isLoading: true,
        error: null,
      })

      const routes = await routeFactory.getAll()

      set({
        routes,
        isLoading: false,
      })
    } catch (error) {
      console.error(error)

      set({
        error: 'No se pudieron cargar las rutas',
        isLoading: false,
      })
    }
  },
}))