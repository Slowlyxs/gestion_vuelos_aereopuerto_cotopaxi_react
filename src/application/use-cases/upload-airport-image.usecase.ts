import { airportService } from "@/infrastructure/services/airport.service";
import type { Airport } from "@/domain/entities/airport.entity";

export async function uploadAirportImageUseCase(id: number, file: File): Promise<Airport> {
  return await airportService.uploadImage(id, file);
}