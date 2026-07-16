export interface FlightState {

  id: number;

  nombre_estado: string;

}

export interface FlightStatusHistory {

  id: number;

  fecha_cambio: string;

  observacion: string;

  id_vuelo: number;

  id_estado: FlightState;

}