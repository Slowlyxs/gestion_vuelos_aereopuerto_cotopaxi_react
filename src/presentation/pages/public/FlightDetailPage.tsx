import { Link } from "react-router-dom";

export default function FlightDetailPage() {
  return (
    <div className="container mx-auto max-w-lg px-6 py-14">
      <div className="overflow-hidden rounded-2xl border shadow-sm">
        {/* Encabezado */}
        <div className="bg-neutral-950 px-6 py-5 text-white">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 font-serif text-sm font-bold">
              <span className="text-[#F5A524]">✈</span> Cotopaxi Airlines
            </span>
            <span className="font-mono text-xs tracking-widest text-[#F5A524]">
              CT-205
            </span>
          </div>
        </div>

        {/* Origen / Destino */}
        <div className="flex items-center justify-between px-6 py-8">
          <div>
            <p className="font-mono text-4xl font-bold tracking-tight">UIO</p>
            <p className="mt-1 text-xs text-muted-foreground">Quito</p>
          </div>
          <div className="flex flex-1 items-center px-4">
            <div className="h-px flex-1 border-t border-dashed" />
            <span className="px-2 text-[#F5A524]">✈</span>
            <div className="h-px flex-1 border-t border-dashed" />
          </div>
          <div className="text-right">
            <p className="font-mono text-4xl font-bold tracking-tight">GYE</p>
            <p className="mt-1 text-xs text-muted-foreground">Guayaquil</p>
          </div>
        </div>

        {/* Perforación */}
        <div className="relative border-t border-dashed">
          <div className="absolute -left-3 -top-3 h-6 w-6 rounded-full bg-background" />
          <div className="absolute -right-3 -top-3 h-6 w-6 rounded-full bg-background" />
        </div>

        {/* Detalles */}
        <div className="grid grid-cols-2 gap-y-5 px-6 py-6 text-sm">
          <Field label="Salida" value="08:30" />
          <Field label="Estado" value="A tiempo" accent />
          <Field label="Puerta" value="A3" />
          <Field label="Aeronave" value="Airbus A320" />
        </div>

        {/* Barcode simulado */}
        <div className="border-t px-6 py-5">
          <div
            className="h-10 w-full"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, #171717 0 2px, transparent 2px 5px)",
            }}
          />
        </div>
      </div>

      <Link
        to="/vuelos"
        className="mt-6 block w-full rounded-md border py-3 text-center text-sm font-medium transition hover:bg-muted"
      >
        Volver al listado
      </Link>
    </div>
  );
}

function Field({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className={`mt-0.5 font-semibold ${accent ? "text-[#F5A524]" : ""}`}>{value}</p>
    </div>
  );
}