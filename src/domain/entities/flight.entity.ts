export interface AirportRoute {
  id: number
  nombre: string
  ciudad: string
  pais: string
  image: string | null
}

export interface Route {
  id: number

  origen: AirportRoute

  destino: AirportRoute
}

export interface Airline {
  id: number
  nombre: string
  pais: string
}

export interface Aircraft {
  id: number
  modelo: string
  capacidad: number
  matricula: string

  aerolinea: Airline
}

export interface Flight {
  id: number

  codigo_vuelo: string

  fecha: string

  estado: string

  precio: number

  asientos_disponibles: number

  ruta: Route

  id_avion: Aircraft
}