import { createTrafficControlUseCase } from '@/application/use-cases/create-traffic-control.usecase'
import { deleteTrafficControlUseCase } from '@/application/use-cases/delete-traffic-control.usecase'
import { getTrafficControlsUseCase } from '@/application/use-cases/get-traffic-controls.usecase'
import { updateTrafficControlUseCase } from '@/application/use-cases/update-traffic-control.usecase'

export const trafficControlFactory = {
  getAll: getTrafficControlsUseCase,
  create: createTrafficControlUseCase,
  update: updateTrafficControlUseCase,
  remove: deleteTrafficControlUseCase,
}