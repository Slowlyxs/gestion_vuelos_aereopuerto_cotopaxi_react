import { employeeService } from "@/infrastructure/services/employee.service";

export async function getEmployeesUseCase() {

  return await employeeService.getAll();

}