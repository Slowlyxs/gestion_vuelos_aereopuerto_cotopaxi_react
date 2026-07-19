export interface Employee {
  id: number
  nombre: string
  cargo: string
}

export interface Crew {
  id: number
  cargo: string

  id_empleado: Employee
}