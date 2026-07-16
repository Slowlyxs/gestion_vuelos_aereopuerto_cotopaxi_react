export interface FlightRecordFlight {
  id: number
  codigo_vuelo: string
  fecha: string
  estado: string
}

export interface FlightRecord {
  id: number
  hora_real_salida: string
  hora_real_llegada: string
  id_vuelo: FlightRecordFlight
}