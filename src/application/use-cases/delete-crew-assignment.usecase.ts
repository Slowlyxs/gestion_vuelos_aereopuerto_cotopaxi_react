import { crewAssignmentService } from '@/infrastructure/services/crew-assignment.service'

export async function deleteCrewAssignmentUseCase(
  id: number,
) {
  await crewAssignmentService.remove(id)
}