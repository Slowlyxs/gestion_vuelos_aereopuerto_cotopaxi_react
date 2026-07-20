import type { AirlinePayload } from '@/domain/entities/airline.entity'

import { airlineService } from '@/infrastructure/services/airline.service'

export async function updateAirlineUseCase(
  id: number,
  payload: AirlinePayload,
) {
  return await airlineService.update(id, payload)
}