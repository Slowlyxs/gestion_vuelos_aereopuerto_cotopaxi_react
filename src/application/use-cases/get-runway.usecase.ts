import { runwayService } from '@/infrastructure/services/runway.service'

export async function getRunwaysUseCase() {
  return await runwayService.getAll()
}