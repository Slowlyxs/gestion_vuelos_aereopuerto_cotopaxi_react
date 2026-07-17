export interface ScheduleFlight {

  id: number;

  codigo_vuelo: string;

  fecha: string;

  estado: string;

}

export interface Schedule {

  id: number;

  salida_programada: string;

  llegada_programada: string;

  id_vuelo: ScheduleFlight;

}