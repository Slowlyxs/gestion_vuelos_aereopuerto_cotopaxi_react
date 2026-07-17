export interface StopoverAirport {

  id: number;

  nombre: string;

  ciudad: string;

  pais: string;

  codigo_iata: string;

}

export interface Stopover {

  id: number;

  id_vuelo: number;

  aeropuerto_escala: StopoverAirport;

}