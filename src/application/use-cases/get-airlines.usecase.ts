import { airlineService } from "@/infrastructure/services/airline.service";

export async function getAirlinesUseCase() {

  return await airlineService.getAll();

}