import { Link } from "react-router-dom";
import { useAuthStore } from "@/presentation/store/auth.store";

import lateral from "@/assets/imagenes/lateral.jpg";
import quito from "@/assets/imagenes/Quito.jpg";
import guayaquil from "@/assets/imagenes/Guayaquil.jpg";
import cuenca from "@/assets/imagenes/cuenca.jpg";
import esmeraldas from "@/assets/imagenes/esmeraldas.jpg";
import lago from "@/assets/imagenes/lago.jpg";

const destinations = [
  { ciudad: "Quito", precio: "$120", imagen: quito },
  { ciudad: "Guayaquil", precio: "$95", imagen: guayaquil },
  { ciudad: "Cuenca", precio: "$110", imagen: cuenca },
  { ciudad: "Esmeraldas", precio: "$80", imagen: esmeraldas },
  { ciudad: "Lago Agrio", precio: "$100", imagen: lago },
];

export default function HomePage() {
  const user = useAuthStore((state) => state.user);

  return (
    <div>
      {/* Banner principal */}
      <div className="relative flex h-72 items-end overflow-hidden px-8 py-9 text-white">
        <img
          src={lateral}
          alt="Cotopaxi Airlines"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/30 to-transparent" />

        <div className="relative z-10">
          <h1 className="text-4xl font-bold">Bienvenido</h1>
          <p className="mt-2 max-w-xs text-sm text-white/80">
            Viaja por Ecuador con seguridad, puntualidad y tecnología.
          </p>
        </div>
      </div>

      {/* Destinos destacados */}
      <div className="container mx-auto px-6 py-8">
        <h2 className="text-xl font-bold">Destinos destacados</h2>

        <div className="mt-4 flex gap-4 overflow-x-auto pb-2">
          {destinations.map((d) => (
            <div
              key={d.ciudad}
              className="relative flex h-48 w-40 flex-shrink-0 flex-col justify-end overflow-hidden rounded-xl p-4 text-white"
            >
              <img
                src={d.imagen}
                alt={d.ciudad}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

              <div className="relative z-10">
                <p className="text-xs text-white/70">Vuelos desde</p>
                <p className="text-xl font-bold">{d.precio}</p>
                <p className="font-semibold">{d.ciudad}</p>
              </div>
            </div>
          ))}
        </div>

        {!user && (
          <Link
            to="/login"
            className="mt-8 inline-block rounded-md bg-primary px-6 py-3 text-sm font-medium text-white"
          >
            Ingresar
          </Link>
        )}
      </div>
    </div>
  );
}