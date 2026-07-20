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

  const [resultado, setResultado] = useState<{
    aerolinea: string;
    aeropuerto: string;
    escala: string | null;
    horario: string;
  } | null>(null);
  const [aviso, setAviso] = useState<string | null>(null);

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

        if (!rAerolineas.ok || !rAeropuertos.ok || !rEscalas.ok || !rHorarios.ok) {
          throw new Error("Error cargando datos");
        }

        const [jAerolineas, jAeropuertos, jEscalas, jHorarios] = await Promise.all([
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
      setAviso("Selecciona Aerolínea, Aeropuerto y Horario.");
      setResultado(null);
      return;
    }

    const aerolinea = aerolineas.find((a) => a.id === aerolineaId);
    const aeropuerto = aeropuertos.find((a) => a.id === aeropuertoId);
    const horario = horarios.find((h) => h.id === horarioId);
    const escala = escalas.find((e) => e.id === escalaId);

    setAviso(null);
    setResultado({
      aerolinea: aerolinea?.nombre ?? "",
      aeropuerto: aeropuerto ? `${aeropuerto.nombre} (${aeropuerto.codigo_iata})` : "",
      escala: escala ? escala.aeropuerto_escala.nombre : null,
      horario: horario ? formatearHorario(horario) : "",
    });
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#F5A524] border-t-transparent" />
      </div>
    );
  }

  return (
    <div>
      <section className="bg-neutral-950 text-white">
        <div className="container mx-auto px-6 py-14">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#F5A524]">
            Disponibilidad
          </p>
          <h1 className="mt-3 font-serif text-4xl font-bold tracking-tight">
            Consulta tu próximo vuelo
          </h1>
          <p className="mt-2 max-w-md text-sm text-white/60">
            Filtra por aerolínea, aeropuerto y horario para ver la
            disponibilidad en tiempo real.
          </p>
        </div>
      </section>

      <section className="container mx-auto max-w-xl px-6 py-12">
        {error && (
          <p className="mb-6 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600">
            {error}
          </p>
        )}

        <div className="space-y-4 rounded-xl border bg-card p-6">
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
            options={horarios.map((h) => ({ value: h.id, label: formatearHorario(h) }))}
          />

          <button
            onClick={buscarVuelo}
            className="w-full rounded-md bg-[#F5A524] py-3 text-sm font-bold text-neutral-950 transition hover:brightness-110"
          >
            Buscar vuelo
          </button>

          {aviso && (
            <p className="rounded-md bg-muted p-3 text-sm text-muted-foreground">
              {aviso}
            </p>
          )}
        </div>

        {resultado && (
          <div className="mt-6 overflow-hidden rounded-xl border">
            <div className="bg-neutral-950 px-5 py-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#F5A524]">
                Vuelo disponible
              </p>
            </div>
            <div className="space-y-3 p-5 text-sm">
              <Row label="Aerolínea" value={resultado.aerolinea} />
              <Row label="Aeropuerto" value={resultado.aeropuerto} />
              {resultado.escala && <Row label="Escala" value={resultado.escala} />}
              <Row label="Horario" value={resultado.horario} mono />
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
      <span className="text-muted-foreground">{label}</span>
      <span className={`font-semibold ${mono ? "font-mono text-xs" : ""}`}>{value}</span>
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

function Select({ label, value, onChange, options, allowEmpty, emptyLabel = "Ninguno" }: SelectProps) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value === "" ? "" : Number(e.target.value))}
        className="w-full rounded-md border bg-background px-3 py-2.5 text-sm focus:border-[#F5A524] focus:outline-none"
      >
        <option value="">{allowEmpty ? emptyLabel : "Seleccione..."}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </label>
  );
}