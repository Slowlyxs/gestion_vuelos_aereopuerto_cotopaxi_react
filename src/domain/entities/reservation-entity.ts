export interface Reservation {
  id: number
  codigo_reserva: string
  fecha_reserva: string
  cantidad_pasajeros: number
  precio_total: number
  estado: string

  vuelo: {
    id: number
    codigo_vuelo: string
    fecha: string
    estado: string
    precio: number
  }
}