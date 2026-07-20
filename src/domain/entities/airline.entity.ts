export interface Airline {
  id_aerolinea: number
  nombre: string
  pais: string
  image: string | null
  image_url: string | null
}

export interface AirlinePayload {
  nombre: string
  pais: string
  image?: File | null
}