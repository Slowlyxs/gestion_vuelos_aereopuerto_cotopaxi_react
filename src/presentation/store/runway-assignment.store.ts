import { create } from "zustand";

import type { RunwayAssignment } from "@/domain/entities/runway-assignment.entity";

import { runwayAssignmentFactory } from "@/infrastructure/factories/runway-assignment.factory";

interface RunwayAssignmentState {

  assignments: RunwayAssignment[];

  isLoading: boolean;

  error: string | null;

  loadAssignments(): Promise<void>;

}

export const useRunwayAssignmentStore = create<RunwayAssignmentState>((set) => ({

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
        await runwayAssignmentFactory.getAll();

      set({
        assignments,
        isLoading: false,
      });

    } catch (error) {

      console.error(error);

      set({
        error: "No se pudieron cargar las asignaciones de pista",
        isLoading: false,
      });

    }

  },

}));