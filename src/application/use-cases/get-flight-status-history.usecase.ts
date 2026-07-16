import { flightStatusHistoryService } from "@/infrastructure/services/flight-status-history.service";

export async function getFlightStatusHistoryUseCase() {

  return await flightStatusHistoryService.getAll();

}