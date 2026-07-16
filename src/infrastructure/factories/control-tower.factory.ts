import { getControlTowersUseCase } from '@/application/use-cases/get-control-towers.usecase'

export const controlTowerFactory = {
  getAll: getControlTowersUseCase,
}