import { getFlightRecordsUseCase } from '@/application/use-cases/get-flight-records.usecase'

export const flightRecordFactory = {
  getAll: getFlightRecordsUseCase,
}