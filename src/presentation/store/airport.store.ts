import { create } from "zustand";
import type { Airport } from "@/domain/entities/airport.entity";
import { getAirportsUseCase } from "@/application/use-cases/get-airports.usecase";
import { uploadAirportImageUseCase } from "@/application/use-cases/upload-airport-image.usecase"; // ← nuevo

interface AirportState {
  airports: Airport[];
  isLoading: boolean;
  error: string | null;

  loadAirports(): Promise<void>;
  uploadAirportImage(id: number, file: File): Promise<void>; // ← nuevo
}

export const useAirportStore = create<AirportState>((set, get) => ({
  airports: [],
  isLoading: false,
  error: null,

  async loadAirports() {
    try {
      set({ isLoading: true, error: null });
      const airports = await getAirportsUseCase();
      set({ airports, isLoading: false });
    } catch (error) {
      console.error(error);
      set({ error: "No se pudieron cargar los aeropuertos", isLoading: false });
    }
  },

  // ← nuevo
  async uploadAirportImage(id, file) {
    try {
      const updated = await uploadAirportImageUseCase(id, file);
      set({
        airports: get().airports.map((a) =>
          a.id_aeropuerto === id ? updated : a
        ),
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
}));