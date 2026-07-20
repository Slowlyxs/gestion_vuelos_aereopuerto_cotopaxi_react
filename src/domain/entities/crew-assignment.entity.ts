export interface CrewAssignmentFlight {
  id: number
  codigo_vuelo: string
  fecha: string
  estado: string
}

export interface CrewAssignmentEmployee {
  id: number
  nombre: string
  cargo: string
}

export interface CrewAssignment {
  id_asignacion: number
  id_vuelo: CrewAssignmentFlight
  id_empleado: CrewAssignmentEmployee
}

export interface CrewAssignmentPayload {
  id_vuelo: number
  id_empleado: number
}