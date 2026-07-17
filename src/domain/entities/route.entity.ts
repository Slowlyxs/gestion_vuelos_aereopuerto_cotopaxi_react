export interface Airport {
  id: number;
  nombre: string;
  ciudad: string;
  pais: string;
  codigo_iata: string;
}

export interface Route {
  id: number;
  origen: Airport;
  destino: Airport;
}