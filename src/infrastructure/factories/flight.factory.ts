import { getFlightsUseCase } from '@/application/use-cases/get-flight.usecase'

export const flightFactory = {
  getAll: getFlightsUseCase,
}