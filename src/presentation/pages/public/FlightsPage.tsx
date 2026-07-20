import { useEffect, useState } from "react";

const baseUrl = "https://cotopaxi-airlines-api.uaeftt-ute.site/api";

interface Aerolinea { id: number; nombre: string }
interface Aeropuerto { id: number; nombre: string; codigo_iata: string }
interface Escala { id: number; aeropuerto_escala: { nombre: string } }
interface Horario {
  id: number;
  salida_programada: string;
  llegada_programada: string;
}

function formatearHorario(h: Horario) {
  const salida = h.salida_programada.slice(0, 16).replace("T", "  ");
  const llegada = h.llegada_programada.slice(0, 16).replace("T", "  ");
  return `${salida}  →  ${llegada}`;
}

export default function FlightsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [aerolineas, setAerolineas] = useState<Aerolinea[]>([]);
  const [aeropuertos, setAeropuertos] = useState<Aeropuerto[]>([]);
  const [escalas, setEscalas] = useState<Escala[]>([]);
  const [horarios, setHorarios] = useState<Horario[]>([]);

  const [aerolineaId, setAerolineaId] = useState<number | "">("");
  const [aeropuertoId, setAeropuertoId] = useState<number | "">("");
  const [escalaId, setEscalaId] = useState<number | "">("");
  const [horarioId, setHorarioId] = useState<number | "">("");

  const [resultado, setResultado] = useState<string | null>(null);

  useEffect(() => {
    async function cargarDatos() {
      try {
        const [rAerolineas, rAeropuertos, rEscalas, rHorarios] =
          await Promise.all([
            fetch(`${baseUrl}/aerolineas/`),
            fetch(`${baseUrl}/aeropuertos/`),
            fetch(`${baseUrl}/escalas/`),
            fetch(`${baseUrl}/horarios/`),
          ]);

        if (
          !rAerolineas.ok ||
          !rAeropuertos.ok ||
          !rEscalas.ok ||
          !rHorarios.ok
        ) {
          throw new Error("Error cargando datos");
        }

        const [jAerolineas, jAeropuertos, jEscalas, jHorarios] =
          await Promise.all([
            rAerolineas.json(),
            rAeropuertos.json(),
            rEscalas.json(),
            rHorarios.json(),
          ]);

        setAerolineas(jAerolineas.results ?? []);
        setAeropuertos(jAeropuertos.results ?? []);
        setEscalas(jEscalas.results ?? []);
        setHorarios(jHorarios.results ?? []);
      } catch {
        setError("Error al cargar información. Intenta de nuevo más tarde.");
      } finally {
        setIsLoading(false);
      }
    }

    cargarDatos();
  }, []);

  function buscarVuelo() {
    if (!aerolineaId || !aeropuertoId || !horarioId) {
      setResultado("Seleccione Aerolínea, Aeropuerto y Horario.");
      return;
    }

    const aerolinea = aerolineas.find((a) => a.id === aerolineaId);
    const aeropuerto = aeropuertos.find((a) => a.id === aeropuertoId);
    const horario = horarios.find((h) => h.id === horarioId);
    const escala = escalas.find((e) => e.id === escalaId);

    setResultado(
      `Vuelo disponible — Aerolínea: ${aerolinea?.nombre}, Aeropuerto: ${aeropuerto?.nombre}` +
        (escala ? `, Escala: ${escala.aeropuerto_escala.nombre}` : "") +
        `, Horario: ${horario ? formatearHorario(horario) : ""}`
    );
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-xl px-6 py-10">
      <h1 className="text-center text-xl font-bold">
        Consulta disponibilidad de vuelos
      </h1>

      {error && (
        <p className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-600">
          {error}
        </p>
      )}

      <div className="mt-8 space-y-4">
        <Select
          label="Aerolínea"
          value={aerolineaId}
          onChange={setAerolineaId}
          options={aerolineas.map((a) => ({ value: a.id, label: a.nombre }))}
        />

        <Select
          label="Aeropuerto"
          value={aeropuertoId}
          onChange={setAeropuertoId}
          options={aeropuertos.map((a) => ({
            value: a.id,
            label: `${a.nombre} (${a.codigo_iata})`,
          }))}
        />

        <Select
          label="Escala (Opcional)"
          value={escalaId}
          onChange={setEscalaId}
          options={escalas.map((e) => ({
            value: e.id,
            label: e.aeropuerto_escala.nombre,
          }))}
          allowEmpty
          emptyLabel="Sin escala"
        />

        <Select
          label="Horario"
          value={horarioId}
          onChange={setHorarioId}
          options={horarios.map((h) => ({
            value: h.id,
            label: formatearHorario(h),
          }))}
        />

        <button
          onClick={buscarVuelo}
          className="w-full rounded-md bg-primary py-3 text-sm font-bold text-white"
        >
          Buscar vuelo
        </button>

        {resultado && (
          <p className="rounded-md bg-muted p-3 text-sm">{resultado}</p>
        )}
      </div>
    </div>
  );
}

interface SelectProps {
  label: string;
  value: number | "";
  onChange: (value: number | "") => void;
  options: { value: number; label: string }[];
  allowEmpty?: boolean;
  emptyLabel?: string;
}

function Select({
  label,
  value,
  onChange,
  options,
  allowEmpty,
  emptyLabel = "Ninguno",
}: SelectProps) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block font-medium">{label}</span>
      <select
        value={value}
        onChange={(e) =>
          onChange(e.target.value === "" ? "" : Number(e.target.value))
        }
        className="w-full rounded-md border px-3 py-2.5 text-sm"
      >
        <option value="">{allowEmpty ? emptyLabel : "Seleccione..."}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}