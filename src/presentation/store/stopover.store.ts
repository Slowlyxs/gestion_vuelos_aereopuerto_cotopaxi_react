import { create } from "zustand";

import type { Stopover } from "@/domain/entities/stopover.entity";

import { stopoverFactory } from "@/infrastructure/factories/stopover.factory";

interface StopoverState {

  stopovers: Stopover[];

  isLoading: boolean;

  error: string | null;

  loadStopovers(): Promise<void>;

}

export const useStopoverStore = create<StopoverState>((set) => ({

  stopovers: [],

  isLoading: false,

  error: null,

  async loadStopovers() {

    try {

      set({
        isLoading: true,
        error: null,
      });

      const stopovers =
        await stopoverFactory.getAll();

      set({
        stopovers,
        isLoading: false,
      });

    } catch (error) {

      console.error(error);

      set({
        error: "No se pudieron cargar las escalas",
        isLoading: false,
      });

    }

  },

}));