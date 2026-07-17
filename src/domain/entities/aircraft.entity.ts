export interface Airline {

  id: number;

  nombre: string;

  pais: string;

}


export interface Aircraft {

  id_avion: number;

  modelo: string;

  capacidad: number;

  matricula: string;

  image: string | null;

  image_url: string | null;

  id_aerolinea: Airline;

}