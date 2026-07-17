import { create } from "zustand";

import type { Weather } from "@/domain/entities/weather.entity";

import { weatherFactory } from "@/infrastructure/factories/weather.factory";

interface WeatherState {

  weather: Weather[];

  isLoading: boolean;

  error: string | null;

  loadWeather(): Promise<void>;

}

export const useWeatherStore = create<WeatherState>((set) => ({

  weather: [],

  isLoading: false,

  error: null,

  async loadWeather() {

    try {

      set({
        isLoading: true,
        error: null,
      });

      const weather = await weatherFactory.getAll();

      set({
        weather,
        isLoading: false,
      });

    } catch (error) {

      console.error(error);

      set({
        error: "No se pudo cargar el clima",
        isLoading: false,
      });

    }

  },

}));    