export interface FlightSummary {

  id: number;

  codigo_vuelo: string;

  fecha: string;

  estado: string;

}

export interface TrafficControl {

  id: number;

  autorizacion: string;

  hora: string;

  id_vuelo: FlightSummary;

}