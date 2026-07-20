import type { CrewAssignmentPayload } from '@/domain/entities/crew-assignment.entity'

import { crewAssignmentService } from '@/infrastructure/services/crew-assignment.service'

export async function updateCrewAssignmentUseCase(
  id: number,
  payload: CrewAssignmentPayload,
) {
  return await crewAssignmentService.update(id, payload)
}