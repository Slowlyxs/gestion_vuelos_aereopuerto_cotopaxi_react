import { getIncidentsUseCase } from '@/application/use-cases/get-incidents.usecase'

export const incidentFactory = {
  getAll: getIncidentsUseCase,
}