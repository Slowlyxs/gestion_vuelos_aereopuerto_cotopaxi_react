import { create } from "zustand";

import type { FlightStatus } from "@/domain/entities/flight-status.entity";

import { flightStatusFactory } from "@/infrastructure/factories/flight-status.factory";

interface FlightStatusState {

  flightStatus: FlightStatus[];

  isLoading: boolean;

  error: string | null;

  loadFlightStatus(): Promise<void>;

}

export const useFlightStatusStore = create<FlightStatusState>((set) => ({

  flightStatus: [],

  isLoading: false,

  error: null,

  async loadFlightStatus() {

    try {

      set({
        isLoading: true,
        error: null,
      });

      const flightStatus = await flightStatusFactory.getAll();

      set({
        flightStatus,
        isLoading: false,
      });

    } catch (error) {

      console.error(error);

      set({
        error: "No se pudieron cargar los estados de vuelo",
        isLoading: false,
      });

    }

  },

}));