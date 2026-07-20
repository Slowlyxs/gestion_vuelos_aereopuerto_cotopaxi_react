import { crewService } from '@/infrastructure/services/crew.service'

export async function getCrewsUseCase() {
  return await crewService.getAll()
}