import { maintenanceService } from '@/infrastructure/services/maintenance.service'

export async function getMaintenancesUseCase() {
  return await maintenanceService.getAll()
}