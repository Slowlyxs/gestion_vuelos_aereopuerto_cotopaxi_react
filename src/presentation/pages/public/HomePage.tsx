// src/presentation/pages/public/HomePage.tsx

import { Link } from "react-router-dom";
import { useAuthStore } from "@/presentation/store/auth.store";

import lateral from "@/assets/imagenes/lateral.jpg";
import quito from "@/assets/imagenes/Quito.jpg";
import guayaquil from "@/assets/imagenes/Guayaquil.jpg";
import cuenca from "@/assets/imagenes/cuenca.jpg";
import esmeraldas from "@/assets/imagenes/esmeraldas.jpg";
import lago from "@/assets/imagenes/lago.jpg";

const destinations = [
  { ciudad: "Quito", codigo: "UIO", precio: "$120", imagen: quito },
  { ciudad: "Guayaquil", codigo: "GYE", precio: "$95", imagen: guayaquil },
  { ciudad: "Cuenca", codigo: "CUE", precio: "$110", imagen: cuenca },
  { ciudad: "Esmeraldas", codigo: "ESM", precio: "$80", imagen: esmeraldas },
  { ciudad: "Lago Agrio", codigo: "LGA", precio: "$100", imagen: lago },
];

const stats = [
  { valor: "5", label: "Destinos nacionales" },
  { valor: "2,400+", label: "Vuelos al año" },
  { valor: "98%", label: "Puntualidad" },
  { valor: "15", label: "Años volando" },
];

export default function HomePage() {
  const user = useAuthStore((state) => state.user);

  return (
    <div>
      <style>{`
        @keyframes flyPath {
          0% { offset-distance: 0%; opacity: 0; }
          8% { opacity: 1; }
          92% { opacity: 1; }
          100% { offset-distance: 100%; opacity: 0; }
        }
        .plane-on-path {
          offset-path: path('M 4 60 C 180 -10, 420 130, 720 40');
          animation: flyPath 6s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .plane-on-path { animation: none; offset-distance: 40%; opacity: 1; }
        }
      `}</style>

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-neutral-950 text-white">
        <img
          src={lateral}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/85 to-neutral-950/40" />

        {/* Ruta de vuelo animada — elemento de firma */}
        <svg
          className="pointer-events-none absolute inset-x-0 top-10 hidden h-40 w-full opacity-70 md:block"
          viewBox="0 0 720 130"
          fill="none"
        >
          <path
            d="M 4 60 C 180 -10, 420 130, 720 40"
            stroke="#F5A524"
            strokeWidth="1"
            strokeDasharray="2 8"
            strokeLinecap="round"
          />
          <circle cx="4" cy="60" r="3" fill="#F5A524" />
          <circle cx="720" cy="40" r="3" fill="#F5A524" />
          <text x="0" y="80" fill="#F5A524" fontSize="11" letterSpacing="2">UIO</text>
          <text x="690" y="30" fill="#F5A524" fontSize="11" letterSpacing="2">GYE</text>
        </svg>
        <div className="plane-on-path motion-safe:block hidden absolute left-0 top-10 -translate-x-1/2 -translate-y-1/2 text-lg text-[#F5A524]">
          ✈
        </div>

        <div className="container relative mx-auto px-6 py-28 md:py-36">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#F5A524]">
            Cotopaxi Airlines · Ecuador
          </p>
          <h1 className="mt-5 max-w-xl font-serif text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl">
            El cielo ecuatoriano,
            <br />a tu horario.
          </h1>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/70">
            Viaja por Ecuador con seguridad, puntualidad y tecnología. Cinco
            rutas nacionales, una sola aerolínea de confianza.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              to="/vuelos"
              className="rounded-md bg-[#F5A524] px-6 py-3 text-sm font-semibold text-neutral-950 transition hover:brightness-110"
            >
              Consultar vuelos
            </Link>
            {!user && (
              <Link
                to="/login"
                className="rounded-md border border-white/25 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
              >
                Ingresar
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* ================= STAT STRIP ================= */}
      <section className="border-b bg-background">
        <div className="container mx-auto grid grid-cols-2 divide-x divide-border px-6 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="px-4 py-8 text-center md:py-10">
              <p className="font-serif text-3xl font-bold md:text-4xl">
                {s.valor}
              </p>
              <p className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= DESTINOS ================= */}
      <section className="container mx-auto px-6 py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          Rutas disponibles
        </p>
        <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight">
          Destinos destacados
        </h2>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {destinations.map((d) => (
            <Link
              to="/vuelos"
              key={d.ciudad}
              className="group relative flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-lg"
            >
              <img
                src={d.imagen}
                alt={d.ciudad}
                className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

              <span className="absolute right-3 top-3 rounded border border-white/30 px-2 py-0.5 font-mono text-[10px] tracking-widest text-white/80">
                {d.codigo}
              </span>

              <div className="relative z-10 p-4 text-white">
                <p className="text-[11px] text-white/70">Vuelos desde</p>
                <p className="text-xl font-bold">{d.precio}</p>
                <p className="text-sm font-medium">{d.ciudad}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ================= CTA FINAL ================= */}
      <section className="bg-neutral-950 text-white">
        <div className="container mx-auto flex flex-col items-start justify-between gap-6 px-6 py-14 md:flex-row md:items-center">
          <div>
            <h3 className="font-serif text-2xl font-bold">
              Gestiona tu operación de vuelo
            </h3>
            <p className="mt-2 max-w-md text-sm text-white/60">
              Acceso para personal de torre de control, mantenimiento,
              operaciones y RRHH.
            </p>
          </div>
          {!user && (
            <Link
              to="/login"
              className="shrink-0 rounded-md bg-[#F5A524] px-6 py-3 text-sm font-semibold text-neutral-950 transition hover:brightness-110"
            >
              Ingresar al panel
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}