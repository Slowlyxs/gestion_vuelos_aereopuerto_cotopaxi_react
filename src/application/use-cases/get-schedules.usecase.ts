import { scheduleService } from "@/infrastructure/services/schedule.service";

export async function getSchedulesUseCase() {

  return await scheduleService.getAll();

}