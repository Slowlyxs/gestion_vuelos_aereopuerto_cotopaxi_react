import { crewAssignmentService } from '@/infrastructure/services/crew-assignment.service'

export async function getCrewAssignmentsUseCase() {
  return await crewAssignmentService.getAll()
}