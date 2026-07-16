import { aircraftTypeService } from "@/infrastructure/services/aircraft-type.service";

export async function getAircraftTypesUseCase() {

  return await aircraftTypeService.getAll();

}