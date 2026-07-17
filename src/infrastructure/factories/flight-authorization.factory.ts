import { getFlightAuthorizationsUseCase } from "@/application/use-cases/get-flight-authorizations.usecase";

export const flightAuthorizationFactory = {

  getAll: getFlightAuthorizationsUseCase,

};