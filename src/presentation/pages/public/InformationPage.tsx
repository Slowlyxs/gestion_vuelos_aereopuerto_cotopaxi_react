export default function InformationPage() {
  const cards = [
    { icon: "🏢", title: "¿Quiénes somos?", description: "Cotopaxi Airlines es una aerolínea enfocada en brindar una experiencia de viaje segura, cómoda y eficiente para todos nuestros pasajeros." },
    { icon: "🏆", title: "Misión", description: "Ofrecer un servicio de transporte aéreo confiable, moderno y orientado a la satisfacción del cliente." },
    { icon: "👁️", title: "Visión", description: "Ser una de las aerolíneas líderes del país, reconocida por su calidad, innovación y excelencia en el servicio." },
    { icon: "🧳", title: "Equipaje", description: "Cada pasajero puede llevar un equipaje de mano de hasta 10 kg y una maleta registrada según la tarifa adquirida." },
    { icon: "✅", title: "Check-in", description: "Disponible en línea desde 24 horas hasta 1 hora antes de la salida del vuelo." },
    { icon: "📋", title: "Políticas", description: "Se recomienda presentarse al aeropuerto con al menos 2 horas de anticipación para vuelos nacionales." },
  ];

  return (
    <div>
      <section className="bg-neutral-950 text-white">
        <div className="container mx-auto px-6 py-14">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#F5A524]">
            Sobre nosotros
          </p>
          <h1 className="mt-3 font-serif text-4xl font-bold tracking-tight">
            Cotopaxi Airlines
          </h1>
          <p className="mt-2 max-w-md text-sm text-white/60">
            Conectamos las principales ciudades del Ecuador con un servicio
            seguro, puntual y de calidad.
          </p>
        </div>
      </section>

      <section className="container mx-auto max-w-3xl px-6 py-12">
        <div className="grid gap-4 sm:grid-cols-2">
          {cards.map((card) => (
            <div key={card.title} className="rounded-xl border bg-card p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F5A524]/10 text-lg">
                {card.icon}
              </span>
              <h2 className="mt-4 font-serif text-lg font-bold">{card.title}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}