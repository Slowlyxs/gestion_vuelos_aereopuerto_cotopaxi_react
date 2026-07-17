import { flightStatusService } from "@/infrastructure/services/flight-status.service";

export async function getFlightStatusUseCase() {

  return await flightStatusService.getAll();

}