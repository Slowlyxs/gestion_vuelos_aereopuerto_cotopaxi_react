import { trafficControlService } from '@/infrastructure/services/traffic-control.service'

export async function deleteTrafficControlUseCase(
  id: number,
) {
  await trafficControlService.remove(id)
}