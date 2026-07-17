export interface Airport {

  id: number;

  nombre: string;

  ciudad: string;

  pais: string;

  codigo_iata: string;

}


export interface Terminal {

  id_terminal: number;

  numero: number;

  id_aeropuerto: Airport;

}