import { boardingGateService } from '@/infrastructure/services/boarding-gate.service'

export async function getBoardingGatesUseCase() {
  return await boardingGateService.getAll()
}