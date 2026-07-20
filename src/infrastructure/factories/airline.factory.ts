import { createAirlineUseCase } from '@/application/use-cases/create-airline.usecase'
import { deleteAirlineUseCase } from '@/application/use-cases/delete-airline.usecase'
import { getAirlinesUseCase } from '@/application/use-cases/get-airlines.usecase'
import { updateAirlineUseCase } from '@/application/use-cases/update-airline.usecase'

export const airlineFactory = {
  getAll: getAirlinesUseCase,
  create: createAirlineUseCase,
  update: updateAirlineUseCase,
  remove: deleteAirlineUseCase,
}