import { create } from "zustand";

import type { AircraftType } from "@/domain/entities/aircraft-type.entity";

import { aircraftTypeFactory } from "@/infrastructure/factories/aircraft-type.factory";

interface AircraftTypeState {

  aircraftTypes: AircraftType[];

  isLoading: boolean;

  error: string | null;

  loadAircraftTypes(): Promise<void>;

}

export const useAircraftTypeStore =
create<AircraftTypeState>((set) => ({

  aircraftTypes: [],

  isLoading: false,

  error: null,

  async loadAircraftTypes() {

    try {

      set({

        isLoading: true,

        error: null,

      });

      const aircraftTypes =
        await aircraftTypeFactory.getAll();

      set({

        aircraftTypes,

        isLoading: false,

      });

    } catch (error) {

      console.error(error);

      set({

        error: "No se pudieron cargar los tipos de avión",

        isLoading: false,

      });

    }

  },

}));