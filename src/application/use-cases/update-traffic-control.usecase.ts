import type { TrafficControlPayload } from '@/domain/entities/traffic-control.entity'

import { trafficControlService } from '@/infrastructure/services/traffic-control.service'

export async function updateTrafficControlUseCase(
  id: number,
  payload: TrafficControlPayload,
) {
  return await trafficControlService.update(
    id,
    payload,
  )
}