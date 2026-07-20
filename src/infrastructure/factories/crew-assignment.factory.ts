import { getCrewAssignmentsUseCase } from '@/application/use-cases/get-crew-assignments.usecase'
import { createCrewAssignmentUseCase } from '@/application/use-cases/create-crew-assignment.usecase'
import { updateCrewAssignmentUseCase } from '@/application/use-cases/update-crew-assignment.usecase'
import { deleteCrewAssignmentUseCase } from '@/application/use-cases/delete-crew-assignment.usecase'

export const crewAssignmentFactory = {
  getAll: getCrewAssignmentsUseCase,
  create: createCrewAssignmentUseCase,
  update: updateCrewAssignmentUseCase,
  remove: deleteCrewAssignmentUseCase,
}