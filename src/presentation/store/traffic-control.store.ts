import { create } from "zustand";

import type { TrafficControl } from "@/domain/entities/traffic-control.entity";

import { trafficControlFactory } from "@/infrastructure/factories/traffic-control.factory";

interface TrafficControlState {

  controls: TrafficControl[];

  isLoading: boolean;

  error: string | null;

  loadControls(): Promise<void>;

}

export const useTrafficControlStore = create<TrafficControlState>((set) => ({

  controls: [],

  isLoading: false,

  error: null,

  async loadControls() {

    try {

      set({
        isLoading: true,
        error: null,
      });

      const controls = await trafficControlFactory.getAll();

      set({
        controls,
        isLoading: false,
      });

    } catch (error) {

      console.error(error);

      set({
        error: "No se pudieron cargar los controles de tráfico",
        isLoading: false,
      });

    }

  },

}));