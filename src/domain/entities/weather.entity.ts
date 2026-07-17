export interface Aeropuerto {
  id: number;
  nombre: string;
  ciudad: string;
  pais: string;
  codigo_iata: string;
}

export interface Weather {

  id_clima: number;

  fecha: string;

  temperatura: string;

  condicion: string;

  velocidad_viento: string;

  id_aeropuerto: Aeropuerto;

}