import { create } from 'zustand'

import type {
  Terminal,
  TerminalPayload,
} from '@/domain/entities/terminal.entity'

import { terminalFactory } from '@/infrastructure/factories/terminal.factory'

interface TerminalState {
  terminals: Terminal[]

  isLoading: boolean
  isSaving: boolean
  deletingId: number | null

  error: string | null

  loadTerminals(): Promise<void>

  createTerminal(
    payload: TerminalPayload,
  ): Promise<void>

  updateTerminal(
    id: number,
    payload: TerminalPayload,
  ): Promise<void>

  deleteTerminal(id: number): Promise<void>

  clearError(): void
}

export const useTerminalStore = create<TerminalState>(
  (set) => ({
    terminals: [],

    isLoading: false,
    isSaving: false,
    deletingId: null,

    error: null,

    async loadTerminals() {
      try {
        set({
          isLoading: true,
          error: null,
        })

        const terminals =
          await terminalFactory.getAll()

        set({
          terminals,
          isLoading: false,
        })
      } catch (error) {
        console.error(error)

        set({
          isLoading: false,
          error:
            'No se pudieron cargar las terminales.',
        })
      }
    },

    async createTerminal(payload) {
      try {
        set({
          isSaving: true,
          error: null,
        })

        const createdTerminal =
          await terminalFactory.create(payload)

        set((state) => ({
          terminals: [
            createdTerminal,
            ...state.terminals,
          ],
          isSaving: false,
        }))
      } catch (error) {
        console.error(error)

        set({
          isSaving: false,
          error:
            'No se pudo crear la terminal.',
        })

        throw error
      }
    },

    async updateTerminal(id, payload) {
      try {
        set({
          isSaving: true,
          error: null,
        })

        const updatedTerminal =
          await terminalFactory.update(id, payload)

        set((state) => ({
          terminals: state.terminals.map(
            (terminal) =>
              terminal.id_terminal === id
                ? updatedTerminal
                : terminal,
          ),
          isSaving: false,
        }))
      } catch (error) {
        console.error(error)

        set({
          isSaving: false,
          error:
            'No se pudo actualizar la terminal.',
        })

        throw error
      }
    },

    async deleteTerminal(id) {
      try {
        set({
          deletingId: id,
          error: null,
        })

        await terminalFactory.remove(id)

        set((state) => ({
          terminals: state.terminals.filter(
            (terminal) =>
              terminal.id_terminal !== id,
          ),
          deletingId: null,
        }))
      } catch (error) {
        console.error(error)

        set({
          deletingId: null,
          error:
            'No se pudo eliminar la terminal. Puede tener puertas de embarque relacionadas.',
        })

        throw error
      }
    },

    clearError() {
      set({
        error: null,
      })
    },
  }),
)