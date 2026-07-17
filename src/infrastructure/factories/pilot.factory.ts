import { getPilotsUseCase } from '@/application/use-cases/get-pilots.usecase'

export const pilotFactory = {
  getAll: getPilotsUseCase,
}