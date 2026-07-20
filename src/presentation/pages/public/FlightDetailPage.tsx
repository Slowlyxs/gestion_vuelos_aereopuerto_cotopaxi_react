import { Link } from "react-router-dom";

export default function FlightDetailPage() {
  const rows = [
    { icon: "🛫", label: "Origen", value: "Quito" },
    { icon: "🛬", label: "Destino", value: "Guayaquil" },
    { icon: "🕗", label: "Hora de salida", value: "08:30" },
    { icon: "🚪", label: "Puerta", value: "A3" },
    { icon: "✈️", label: "Aeronave", value: "Airbus A320" },
    { icon: "ℹ️", label: "Estado", value: "A tiempo" },
  ];

  return (
    <div className="container mx-auto max-w-lg px-6 py-10">
      <div className="rounded-2xl border bg-card p-6">
        <div className="text-center">
          <span className="text-5xl">✈️</span>
          <h1 className="mt-3 text-2xl font-bold">Vuelo CT-205</h1>
        </div>

        <div className="mt-6 divide-y">
          {rows.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between py-3"
            >
              <span className="flex items-center gap-3 text-sm text-muted-foreground">
                <span>{row.icon}</span>
                {row.label}
              </span>
              <span className="text-sm font-bold">{row.value}</span>
            </div>
          ))}
        </div>

        <Link
          to="/vuelos"
          className="mt-6 block w-full rounded-md bg-primary py-3 text-center text-sm font-medium text-white"
        >
          Volver al listado
        </Link>
      </div>
    </div>
  );
}