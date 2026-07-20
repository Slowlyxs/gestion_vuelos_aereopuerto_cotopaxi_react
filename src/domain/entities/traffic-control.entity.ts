export interface TrafficControlFlight {
  id: number
  codigo_vuelo: string
  fecha: string
  estado: string
}

export interface TrafficControl {
  id: number
  autorizacion: string
  hora: string
  id_vuelo: TrafficControlFlight
}

export interface TrafficControlPayload {
  autorizacion: string
  hora: string
  id_vuelo: number
}