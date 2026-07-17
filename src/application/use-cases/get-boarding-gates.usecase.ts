import { gateService } from '@/infrastructure/services/boarding-gate.service'


export async function getGatesUseCase() {

  return await gateService.getAll()

}