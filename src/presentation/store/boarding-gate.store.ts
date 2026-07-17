import { create } from 'zustand'

import type { Gate } from '@/domain/entities/boarding-gate.entity'

import { gateFactory } from '@/infrastructure/factories/boarding-gate.factory'


interface GateState {

  gates: Gate[]

  isLoading: boolean

  error: string | null


  loadGates(): Promise<void>

}


export const useGateStore = create<GateState>((set) => ({

  gates: [],

  isLoading: false,

  error: null,


  async loadGates() {

    try {

      set({
        isLoading: true,
        error: null,
      })


      const gates = await gateFactory.getAll()


      set({

        gates,

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