export interface Flight {
  id: number
  codigo_vuelo: string
  fecha: string
  estado: string
}

export interface Runway {
  id_pista: number
  codigo: string
  estado: string
}

export interface RunwayAssignment {
  id_asignacion_pista: number
  id_vuelo: Flight
  id_pista: Runway
}