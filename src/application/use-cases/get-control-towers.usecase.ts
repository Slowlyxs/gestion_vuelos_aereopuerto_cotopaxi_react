import { controlTowerService } from '@/infrastructure/services/control-tower.service'

export async function getControlTowersUseCase() {
  return await controlTowerService.getAll()
}