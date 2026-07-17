import { flightService } from '@/infrastructure/services/flight.service'

export async function getFlightsUseCase() {
  return await flightService.getAll()
}