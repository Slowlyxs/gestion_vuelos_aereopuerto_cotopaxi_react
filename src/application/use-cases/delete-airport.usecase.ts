import { airportService } from '@/infrastructure/services/airport.service'

export async function deleteAirportUseCase(
  id: number,
) {
  await airportService.remove(id)
}