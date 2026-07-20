import { Link } from "react-router-dom";

export default function ContactPage() {
  const contacts = [
    { icon: "📞", title: "Teléfono", subtitle: "+593 2 123 4567" },
    { icon: "✉️", title: "Correo", subtitle: "contacto@cotopaxiairlines.com" },
    { icon: "📍", title: "Dirección", subtitle: "Aeropuerto Internacional Mariscal Sucre, Quito, Ecuador" },
    { icon: "🕒", title: "Horario de atención", subtitle: "Lunes a Domingo, 08:00 - 20:00" },
  ];

  return (
    <div>
      <section className="bg-neutral-950 text-white">
        <div className="container mx-auto px-6 py-14">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#F5A524]">
            Estamos aquí para ayudarte
          </p>
          <h1 className="mt-3 font-serif text-4xl font-bold tracking-tight">
            Contáctanos
          </h1>
        </div>
      </section>

      <section className="container mx-auto max-w-2xl px-6 py-12">
        <div className="grid gap-3 sm:grid-cols-2">
          {contacts.map((c) => (
            <div key={c.title} className="flex items-start gap-4 rounded-xl border bg-card p-5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F5A524]/10 text-base">
                {c.icon}
              </span>
              <div>
                <p className="font-semibold">{c.title}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{c.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        <Link
          to="/"
          className="mt-8 block w-full rounded-md bg-neutral-950 py-3 text-center text-sm font-semibold text-white transition hover:bg-neutral-800"
        >
          Volver al inicio
        </Link>
      </section>
    </div>
  );
}