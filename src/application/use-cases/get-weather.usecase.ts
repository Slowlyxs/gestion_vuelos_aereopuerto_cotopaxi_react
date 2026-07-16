import { weatherService } from "@/infrastructure/services/weather.service";

export async function getWeatherUseCase() {

  return await weatherService.getAll();

}