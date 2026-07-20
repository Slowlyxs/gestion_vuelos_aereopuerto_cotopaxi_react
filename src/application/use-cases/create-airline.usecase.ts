import type { AirlinePayload } from '@/domain/entities/airline.entity'

import { airlineService } from '@/infrastructure/services/airline.service'

export async function createAirlineUseCase(
  payload: AirlinePayload,
) {
  return await airlineService.create(payload)
}