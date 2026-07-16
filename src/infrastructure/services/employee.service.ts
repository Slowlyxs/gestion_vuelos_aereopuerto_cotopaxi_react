import { apiClient } from "../http/axios-client";

import type { Employee } from "@/domain/entities/employee.entity";

export const employeeService = {

  async getAll(): Promise<Employee[]> {

    const response = await apiClient.get("/empleados/");

    const data = response.data;

    return Array.isArray(data)
      ? data
      : data.results ?? [];

  }

};