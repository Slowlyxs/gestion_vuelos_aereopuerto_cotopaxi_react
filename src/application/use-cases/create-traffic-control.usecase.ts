import type { TrafficControlPayload } from '@/domain/entities/traffic-control.entity'

import { trafficControlService } from '@/infrastructure/services/traffic-control.service'

export async function createTrafficControlUseCase(
  payload: TrafficControlPayload,
) {
  return await trafficControlService.create(payload)
}