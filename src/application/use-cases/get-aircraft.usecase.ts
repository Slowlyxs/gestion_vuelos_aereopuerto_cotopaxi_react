import { aircraftService } from "@/infrastructure/services/aircraft.service";

export async function getAircraftUseCase() {

  return await aircraftService.getAll();

}