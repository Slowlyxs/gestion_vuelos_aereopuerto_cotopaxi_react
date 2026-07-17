import { create } from "zustand";

import type { Employee } from "@/domain/entities/employee.entity";

import { employeeFactory } from "@/infrastructure/factories/employee.factory";

interface EmployeeState {

  employees: Employee[];

  isLoading: boolean;

  error: string | null;

  loadEmployees(): Promise<void>;

}

export const useEmployeeStore = create<EmployeeState>((set) => ({

  employees: [],

  isLoading: false,

  error: null,

  async loadEmployees() {

    try {

      set({
        isLoading: true,
        error: null,
      });

      const employees = await employeeFactory.getAll();

      set({
        employees,
        isLoading: false,
      });

    } catch (error) {

      console.error(error);

      set({
        error: "No se pudieron cargar los empleados",
        isLoading: false,
      });

    }

  },

}));