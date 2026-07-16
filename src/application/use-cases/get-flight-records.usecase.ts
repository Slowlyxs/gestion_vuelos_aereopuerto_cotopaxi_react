import { flightRecordService } from '@/infrastructure/services/flight-record.service'

export async function getFlightRecordsUseCase() {
  return await flightRecordService.getAll()
}