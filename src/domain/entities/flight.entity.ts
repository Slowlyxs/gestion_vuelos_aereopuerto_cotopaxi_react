export interface FlightAirline {
  id: number
  nombre: string
  pais: string
}

export interface FlightAircraft {
  id: number
  modelo: string
  capacidad: number
  matricula: string
  aerolinea: FlightAirline
}

export interface Flight {
  id: number
  codigo_vuelo: string
  fecha: string
  estado: string
  id_avion: FlightAircraft
}