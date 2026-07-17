import { pilotService } from '@/infrastructure/services/pilot.service'

export async function getPilotsUseCase() {
  return await pilotService.getAll()
}