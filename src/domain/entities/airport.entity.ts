export interface Airport {
  id_aeropuerto: number
  nombre: string
  ciudad: string
  pais: string
  codigo_iata: string
  image: string | null
  image_url: string | null
}

export interface AirportPayload {
  nombre: string
  ciudad: string
  pais: string
  codigo_iata: string
  image?: File | null
}