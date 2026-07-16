import { stopoverService } from "@/infrastructure/services/stopover.service";

export async function getStopoversUseCase() {

  return await stopoverService.getAll();

}