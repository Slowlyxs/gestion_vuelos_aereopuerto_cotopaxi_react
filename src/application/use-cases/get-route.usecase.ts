import { routeService } from "@/infrastructure/services/route.service";

export async function getRoutesUseCase() {
  return await routeService.getAll()
}