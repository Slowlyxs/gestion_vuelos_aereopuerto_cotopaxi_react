import type { AirportPayload } from '@/domain/entities/airport.entity'

import { airportService } from '@/infrastructure/services/airport.service'

export async function createAirportUseCase(
  payload: AirportPayload,
) {
  return await airportService.create(payload)
}