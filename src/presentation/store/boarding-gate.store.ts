import { create } from 'zustand'

import type { BoardingGate } from '@/domain/entities/boarding-gate.entity'

import { boardingGateFactory } from '@/infrastructure/factories/boarding-gate.factory'

interface BoardingGateState {
  boardingGates: BoardingGate[]
  isLoading: boolean
  error: string | null

  loadBoardingGates(): Promise<void>
}

export const useBoardingGateStore = create<BoardingGateState>((set) => ({
  boardingGates: [],
  isLoading: false,
  error: null,

  async loadBoardingGates() {
    try {
      set({
        isLoading: true,
        error: null,
      })

      const boardingGates = await boardingGateFactory.getAll()

      set({
        boardingGates,
        isLoading: false,
      })
    } catch (error) {
      console.error(error)

      set({
        error: 'No se pudieron cargar las puertas de embarque',
        isLoading: false,
      })
    }
  },
}))