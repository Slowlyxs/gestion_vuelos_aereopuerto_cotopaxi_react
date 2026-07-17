export interface IncidentFlight {
  id: number
  codigo_vuelo: string
  fecha: string
  estado: string
}

export interface Incident {
  id: number
  descripcion: string
  fecha: string
  id_vuelo: IncidentFlight
}