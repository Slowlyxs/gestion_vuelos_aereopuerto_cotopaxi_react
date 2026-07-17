import { create } from "zustand";

import type { CrewAssignment } from "@/domain/entities/crew-assignment.entity";

import { crewAssignmentFactory } from "@/infrastructure/factories/crew-assignment.factory";

interface CrewAssignmentState {

  assignments: CrewAssignment[];

  isLoading: boolean;

  error: string | null;

  loadAssignments(): Promise<void>;

}

export const useCrewAssignmentStore = create<CrewAssignmentState>((set) => ({

  assignments: [],

  isLoading: false,

  error: null,

  async loadAssignments() {

    try {

      set({
        isLoading: true,
        error: null,
      });

      const assignments =
        await crewAssignmentFactory.getAll();

      set({
        assignments,
        isLoading: false,
      });

    } catch (error) {

      console.error(error);

      set({
        error: "No se pudieron cargar las asignaciones de tripulación",
        isLoading: false,
      });

    }

  },

}));