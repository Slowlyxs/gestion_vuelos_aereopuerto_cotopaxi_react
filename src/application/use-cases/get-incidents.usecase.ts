import { incidentService } from '@/infrastructure/services/incident.service'

export async function getIncidentsUseCase() {
  return await incidentService.getAll()
}