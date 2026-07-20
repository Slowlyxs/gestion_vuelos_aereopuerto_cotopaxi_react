import { createAirportUseCase } from '@/application/use-cases/create-airport.usecase'
import { deleteAirportUseCase } from '@/application/use-cases/delete-airport.usecase'
import { getAirportsUseCase } from '@/application/use-cases/get-airports.usecase'
import { updateAirportUseCase } from '@/application/use-cases/update-airport.usecase'

export const airportFactory = {
  getAll: getAirportsUseCase,
  create: createAirportUseCase,
  update: updateAirportUseCase,
  remove: deleteAirportUseCase,
}