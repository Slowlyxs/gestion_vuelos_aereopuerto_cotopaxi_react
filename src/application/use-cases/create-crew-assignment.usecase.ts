import type { CrewAssignmentPayload } from '@/domain/entities/crew-assignment.entity'

import { crewAssignmentService } from '@/infrastructure/services/crew-assignment.service'

export async function createCrewAssignmentUseCase(
  payload: CrewAssignmentPayload,
) {
  return await crewAssignmentService.create(payload)
}