import { runwayAssignmentService } from "@/infrastructure/services/runway-assignment.service";

export async function getRunwayAssignmentsUseCase() {

  return await runwayAssignmentService.getAll();

}