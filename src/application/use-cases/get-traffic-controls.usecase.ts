import { trafficControlService } from "@/infrastructure/services/traffic-control.service";

export async function getTrafficControlsUseCase() {

  return await trafficControlService.getAll();

}