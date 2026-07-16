import { flightAuthorizationService } from "@/infrastructure/services/flight-authorization.service";

export async function getFlightAuthorizationsUseCase() {

  return await flightAuthorizationService.getAll();

}