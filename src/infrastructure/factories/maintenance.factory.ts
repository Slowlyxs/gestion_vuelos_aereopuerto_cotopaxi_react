import { getMaintenancesUseCase } from '@/application/use-cases/get-maintenances.usecase'

export const maintenanceFactory = {
  getAll: getMaintenancesUseCase,
}