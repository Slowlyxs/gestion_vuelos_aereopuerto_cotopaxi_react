import { Link } from "react-router-dom";

export default function ContactPage() {
  const contacts = [
    { icon: "📞", title: "Teléfono", subtitle: "+593 2 123 4567" },
    { icon: "✉️", title: "Correo", subtitle: "contacto@cotopaxiairlines.com" },
    {
      icon: "📍",
      title: "Dirección",
      subtitle: "Aeropuerto Internacional Mariscal Sucre, Quito, Ecuador",
    },
    {
      icon: "🕒",
      title: "Horario de atención",
      subtitle: "Lunes a Domingo, 08:00 - 20:00",
    },
  ];

  return (
    <div className="container mx-auto max-w-2xl px-6 py-10">
      <h1 className="text-2xl font-bold">Contáctanos</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Estamos disponibles para ayudarte con cualquier consulta.
      </p>

      <div className="mt-8 space-y-3">
        {contacts.map((c) => (
          <div
            key={c.title}
            className="flex items-center gap-4 rounded-lg border bg-card p-4"
          >
            <span className="text-xl">{c.icon}</span>
            <div>
              <p className="font-bold">{c.title}</p>
              <p className="text-sm text-muted-foreground">{c.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      <Link
        to="/"
        className="mt-8 block w-full rounded-md bg-primary px-4 py-3 text-center text-sm font-medium text-white"
      >
        Volver al Inicio
      </Link>
    </div>
  );
}