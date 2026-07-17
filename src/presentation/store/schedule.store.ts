import { create } from "zustand";

import type { Schedule } from "@/domain/entities/schedule.entity";

import { scheduleFactory } from "@/infrastructure/factories/schedule.factory";

interface ScheduleState {

  schedules: Schedule[];

  isLoading: boolean;

  error: string | null;

  loadSchedules(): Promise<void>;

}

export const useScheduleStore = create<ScheduleState>((set) => ({

  schedules: [],

  isLoading: false,

  error: null,

  async loadSchedules() {

    try {

      set({
        isLoading: true,
        error: null,
      });

      const schedules = await scheduleFactory.getAll();

      set({
        schedules,
        isLoading: false,
      });

    } catch (error) {

      console.error(error);

      set({
        error: "No se pudieron cargar los horarios",
        isLoading: false,
      });

    }

  },

}));