import { create } from "zustand";

import type { Airline } from "@/domain/entities/airline.entity";

import { airlineFactory } from "@/infrastructure/factories/airline.factory";

interface AirlineState {

  airlines: Airline[];

  isLoading: boolean;

  error: string | null;

  loadAirlines(): Promise<void>;

}

export const useAirlineStore = create<AirlineState>((set) => ({

  airlines: [],

  isLoading: false,

  error: null,

  async loadAirlines() {

    try {

      set({
        isLoading: true,
        error: null,
      });

      const airlines = await airlineFactory.getAll();

      set({
        airlines,
        isLoading: false,
      });

    } catch (error) {

      console.error(error);

      set({
        error: "No se pudieron cargar las aerolíneas",
        isLoading: false,
      });

    }

  }

}));