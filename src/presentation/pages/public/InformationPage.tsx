export default function InformationPage() {
  const cards = [
    {
      icon: "🏢",
      title: "¿Quiénes somos?",
      description:
        "Cotopaxi Airlines es una aerolínea enfocada en brindar una experiencia de viaje segura, cómoda y eficiente para todos nuestros pasajeros.",
    },
    {
      icon: "🏆",
      title: "Misión",
      description:
        "Ofrecer un servicio de transporte aéreo confiable, moderno y orientado a la satisfacción del cliente.",
    },
    {
      icon: "👁️",
      title: "Visión",
      description:
        "Ser una de las aerolíneas líderes del país, reconocida por su calidad, innovación y excelencia en el servicio.",
    },
    {
      icon: "🧳",
      title: "Equipaje",
      description:
        "Cada pasajero puede llevar un equipaje de mano de hasta 10 kg y una maleta registrada según la tarifa adquirida.",
    },
    {
      icon: "✅",
      title: "Check-in",
      description:
        "Disponible en línea desde 24 horas hasta 1 hora antes de la salida del vuelo.",
    },
    {
      icon: "📋",
      title: "Políticas",
      description:
        "Se recomienda presentarse al aeropuerto con al menos 2 horas de anticipación para vuelos nacionales.",
    },
  ];

  return (
    <div className="container mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-bold">Cotopaxi Airlines</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Conectamos las principales ciudades del Ecuador con un servicio
        seguro, puntual y de calidad.
      </p>

      <div className="mt-8 space-y-4">
        {cards.map((card) => (
          <div
            key={card.title}
            className="flex gap-4 rounded-xl border bg-card p-5"
          >
            <span className="text-2xl">{card.icon}</span>
            <div>
              <h2 className="font-bold">{card.title}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}