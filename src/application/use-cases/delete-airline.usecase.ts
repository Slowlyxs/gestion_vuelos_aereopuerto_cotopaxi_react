import { airlineService } from '@/infrastructure/services/airline.service'

export async function deleteAirlineUseCase(
  id: number,
) {
  await airlineService.remove(id)
}