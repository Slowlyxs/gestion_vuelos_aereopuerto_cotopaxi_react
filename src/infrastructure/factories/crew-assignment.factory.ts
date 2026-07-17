import { getCrewAssignmentsUseCase } from '@/application/use-cases/get-crew-assignments.usecase'

export const crewAssignmentFactory = {
  getAll: getCrewAssignmentsUseCase,
}