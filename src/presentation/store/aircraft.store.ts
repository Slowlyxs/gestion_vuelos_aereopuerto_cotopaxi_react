import { create } from "zustand";

import type { Aircraft } from "@/domain/entities/aircraft.entity";

import { aircraftFactory } from "@/infrastructure/factories/aircraft.factory";

interface AircraftState {

  aircraft: Aircraft[];

  isLoading: boolean;

  error: string | null;

  loadAircraft(): Promise<void>;

}

export const useAircraftStore = create<AircraftState>((set) => ({

  aircraft: [],

  isLoading: false,

  error: null,

  async loadAircraft() {

    try {

      set({
        isLoading: true,
        error: null,
      });

      const aircraft = await aircraftFactory.getAll();

      set({
        aircraft,
        isLoading: false,
      });

    } catch (error) {

      console.error(error);

      set({
        error: "No se pudieron cargar los aviones",
        isLoading: false,
      });

    }

  },

}));