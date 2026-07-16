import { create } from 'zustand'

import type { Terminal } from '@/domain/entities/terminal.entity'

import { terminalFactory } from '@/infrastructure/factories/terminal.factory'

interface TerminalState {
  terminals: Terminal[]
  isLoading: boolean
  error: string | null

  loadTerminals(): Promise<void>
}

export const useTerminalStore = create<TerminalState>((set) => ({
  terminals: [],
  isLoading: false,
  error: null,

  async loadTerminals() {
    try {
      set({
        isLoading: true,
        error: null,
      })

      const terminals = await terminalFactory.getAll()

      set({
        terminals,
        isLoading: false,
      })
    } catch (error) {
      console.error(error)

      set({
        error: 'No se pudieron cargar las terminales',
        isLoading: false,
      })
    }
  },
}))