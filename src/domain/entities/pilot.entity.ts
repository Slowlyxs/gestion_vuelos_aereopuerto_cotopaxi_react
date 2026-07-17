export interface PilotEmployee {
  id: number
  nombre: string
  cargo: string
}

export interface Pilot {
  id: number
  licencia: string
  id_empleado: PilotEmployee
  image_url: string | null
}   