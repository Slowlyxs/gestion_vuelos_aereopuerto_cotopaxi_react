import { airportService } 
from "@/infrastructure/services/airport.service";


export async function getAirportsUseCase(){

  return await airportService.getAll();

}