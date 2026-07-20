import type { AirportPayload } from '@/domain/entities/airport.entity'

import { airportService } from '@/infrastructure/services/airport.service'

export async function updateAirportUseCase(
  id: number,
  payload: AirportPayload,
) {
  return await airportService.update(id, payload)
}