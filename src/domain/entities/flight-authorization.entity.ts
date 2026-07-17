export interface Airline {
  id: number;
  nombre: string;
  pais: string;
}

export interface Aircraft {
  id: number;
  modelo: string;
  capacidad: number;
  matricula: string;
  aerolinea: Airline;
}

export interface Flight {
  id: number;
  codigo_vuelo: string;
  fecha: string;
  estado: string;
  id_avion: Aircraft;
}

export interface FlightAuthorization {
  id_autorizacion: number;
  tipo_autorizacion: string;
  fecha: string;
  estado: string;
  id_vuelo: Flight;
}