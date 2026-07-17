export interface Airport {

  id: number;

  nombre: string;

  ciudad: string;

  pais: string;

  codigo_iata: string;

}


export interface Terminal {

  id: number;

  numero: number;

  aeropuerto: Airport;

}


export interface Gate {

  id_puerta: number;

  numero: number;

  id_terminal: Terminal;

}