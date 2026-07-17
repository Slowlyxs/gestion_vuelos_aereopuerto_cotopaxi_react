export interface Flight {
  id: number
  codigo_vuelo: string
  fecha: string
  estado: string
}

export interface Employee {
  id: number
  nombre: string
  cargo: string
}

export interface CrewAssignment {
  id_asignacion: number
  id_vuelo: Flight
  id_empleado: Employee
}