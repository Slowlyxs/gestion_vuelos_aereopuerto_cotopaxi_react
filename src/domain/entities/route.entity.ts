export interface RouteAirport {
  id: number
  nombre: string
  ciudad: string
  codigo_iata: string
}

export interface Route {
  id: number
  origen: RouteAirport
  destino: RouteAirport
}