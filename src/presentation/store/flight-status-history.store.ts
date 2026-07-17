import { create } from "zustand";

import type { FlightStatusHistory } from "@/domain/entities/flight-status-history.entity";

import { flightStatusHistoryFactory } from "@/infrastructure/factories/flight-status-history.factory";

interface FlightStatusHistoryState {

  history: FlightStatusHistory[];

  isLoading: boolean;

  error: string | null;

  loadHistory(): Promise<void>;

}

export const useFlightStatusHistoryStore =
create<FlightStatusHistoryState>((set) => ({

  history: [],

  isLoading: false,

  error: null,

  async loadHistory() {

    try {

      set({
        isLoading: true,
        error: null,
      });

      const history =
        await flightStatusHistoryFactory.getAll();

      set({
        history,
        isLoading: false,
      });

    } catch (error) {

      console.error(error);

      set({
        error: "No se pudo cargar el historial de estados",
        isLoading: false,
      });

    }

  },

}));