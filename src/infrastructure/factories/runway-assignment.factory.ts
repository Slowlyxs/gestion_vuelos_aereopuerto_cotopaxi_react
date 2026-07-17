import { getRunwayAssignmentsUseCase } from '@/application/use-cases/get-runway-assignments.usecase'

export const runwayAssignmentFactory = {
  getAll: getRunwayAssignmentsUseCase,
}