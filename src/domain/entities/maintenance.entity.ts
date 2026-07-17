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

export interface Maintenance {
  id_mantenimiento: number;
  fecha: string;
  estado: string;
  id_avion: Aircraft;
}