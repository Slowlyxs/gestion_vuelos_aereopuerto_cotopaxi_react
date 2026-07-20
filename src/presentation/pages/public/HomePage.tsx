// src/presentation/pages/public/HomePage.tsx

import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  BaggageClaim,
  Building2,
  CalendarDays,
  Clock3,
  Headphones,
  MapPin,
  Plane,
  PlaneTakeoff,
  Search,
  ShieldCheck,
} from 'lucide-react'

import { useAirportStore } from '@/presentation/store/airport.store'
import { useAirlineStore } from '@/presentation/store/airline.store'
import { useFlightStore } from '@/presentation/store/flight.store'

import { Button } from '@/presentation/components/ui/button'
import { Input } from '@/presentation/components/ui/input'
import { Label } from '@/presentation/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/presentation/components/ui/card'

export default function HomePage() {
  const navigate = useNavigate()

  const {
    airports,
    loadAirports,
    isLoading: airportsLoading,
  } = useAirportStore()

  const {
    airlines,
    loadAirlines,
    isLoading: airlinesLoading,
  } = useAirlineStore()

  const {
    flights,
    loadFlights,
    isLoading: flightsLoading,
  } = useFlightStore()

  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')
  const [date, setDate] = useState('')

  useEffect(() => {
    loadAirports()
    loadAirlines()
    loadFlights()
  }, [loadAirports, loadAirlines, loadFlights])

  const featuredFlights = useMemo(() => flights.slice(0, 3), [flights])
  const featuredAirlines = useMemo(() => airlines.slice(0, 4), [airlines])

  const minimumDate = new Date().toISOString().split('T')[0]

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const params = new URLSearchParams()

    if (origin) {
      params.set('origen', origin)
    }

    if (destination) {
      params.set('destino', destination)
    }

    if (date) {
      params.set('fecha', date)
    }

    const query = params.toString()

    navigate(query ? `/vuelos?${query}` : '/vuelos')
  }

  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden border-b bg-gradient-to-br from-primary/15 via-background to-secondary/10">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-secondary/10 blur-3xl" />

        <div className="relative mx-auto grid min-h-[560px] max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border bg-background/80 px-4 py-2 text-sm shadow-sm backdrop-blur">
              <PlaneTakeoff className="h-4 w-4 text-primary" />
              Aeropuerto y operaciones Cotopaxi
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Tu próximo destino comienza aquí
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
              Consulta vuelos, horarios, aerolíneas y toda la información
              necesaria para preparar tu viaje.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/vuelos">
                  Ver vuelos
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button asChild size="lg" variant="outline">
                <Link to="/informacion">
                  Información para viajar
                </Link>
              </Button>
            </div>
          </div>

          {/* Buscador */}
          <Card className="border bg-background/95 shadow-xl backdrop-blur">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-primary/10 p-3 text-primary">
                  <Search className="h-5 w-5" />
                </div>

                <div>
                  <CardTitle>Busca tu vuelo</CardTitle>
                  <CardDescription>
                    Selecciona origen, destino y fecha
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSearch} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="origin">Origen</Label>

                  <div className="relative">
                    <MapPin className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

                    <select
                      id="origin"
                      value={origin}
                      onChange={(event) => setOrigin(event.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">Selecciona un aeropuerto</option>

                      {airports.map((airport) => (
                        <option
                          key={airport.id_aeropuerto}
                          value={airport.codigo_iata}
                        >
                          {airport.ciudad} — {airport.codigo_iata}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="destination">Destino</Label>

                  <div className="relative">
                    <MapPin className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

                    <select
                      id="destination"
                      value={destination}
                      onChange={(event) => setDestination(event.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">Selecciona un destino</option>

                      {airports
                        .filter(
                          (airport) => airport.codigo_iata !== origin,
                        )
                        .map((airport) => (
                          <option
                            key={airport.id_aeropuerto}
                            value={airport.codigo_iata}
                          >
                            {airport.ciudad} — {airport.codigo_iata}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date">Fecha del viaje</Label>

                  <div className="relative">
                    <CalendarDays className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

                    <Input
                      id="date"
                      type="date"
                      min={minimumDate}
                      value={date}
                      onChange={(event) => setDate(event.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full" size="lg">
                  <Search className="mr-2 h-4 w-4" />
                  Buscar vuelos
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Estadísticas */}
      <section className="border-b bg-muted/30">
        <div className="mx-auto grid max-w-7xl gap-4 px-6 py-8 sm:grid-cols-3 lg:px-8">
          <StatCard
            icon={<Plane className="h-5 w-5" />}
            value={flightsLoading ? '—' : flights.length}
            label="Vuelos disponibles"
          />

          <StatCard
            icon={<Building2 className="h-5 w-5" />}
            value={airlinesLoading ? '—' : airlines.length}
            label="Aerolíneas registradas"
          />

          <StatCard
            icon={<MapPin className="h-5 w-5" />}
            value={airportsLoading ? '—' : airports.length}
            label="Aeropuertos conectados"
          />
        </div>
      </section>

      {/* Próximos vuelos */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <SectionHeader
          eyebrow="Vuelos"
          title="Próximos vuelos"
          description="Consulta los vuelos disponibles y revisa su fecha, estado y aerolínea."
          link="/vuelos"
          linkText="Ver todos los vuelos"
        />

        {flightsLoading ? (
          <LoadingCards />
        ) : featuredFlights.length > 0 ? (
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredFlights.map((flight) => (
              <Card
                key={flight.id}
                className="overflow-hidden transition hover:-translate-y-1 hover:shadow-lg"
              >
                <CardHeader className="border-b bg-muted/30">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Código de vuelo
                      </p>

                      <CardTitle className="mt-1">
                        {flight.codigo_vuelo}
                      </CardTitle>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusClass(
                        flight.estado,
                      )}`}
                    >
                      {flight.estado}
                    </span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4 pt-6">
                  <FlightDetail
                    icon={<CalendarDays className="h-4 w-4" />}
                    label="Fecha"
                    value={formatDate(flight.fecha)}
                  />

                  <FlightDetail
                    icon={<Plane className="h-4 w-4" />}
                    label="Avión"
                    value={`${flight.id_avion.modelo} · ${flight.id_avion.matricula}`}
                  />

                  <FlightDetail
                    icon={<Building2 className="h-4 w-4" />}
                    label="Aerolínea"
                    value={flight.id_avion.aerolinea.nombre}
                  />

                  <Button asChild variant="outline" className="w-full">
                    <Link to={`/vuelos/${flight.id}`}>
                      Ver detalles
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyState message="No hay vuelos disponibles actualmente." />
        )}
      </section>

      {/* Aerolíneas */}
      <section className="border-y bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <SectionHeader
            eyebrow="Aerolíneas"
            title="Aerolíneas que operan con nosotros"
            description="Conoce las aerolíneas registradas y disponibles en nuestra plataforma."
            link="/aerolineas"
            linkText="Ver todas las aerolíneas"
          />

          {airlinesLoading ? (
            <LoadingCards />
          ) : featuredAirlines.length > 0 ? (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featuredAirlines.map((airline) => (
                <Card
                  key={airline.id_aerolinea}
                  className="overflow-hidden transition hover:shadow-md"
                >
                  <div className="flex h-36 items-center justify-center bg-background">
                    {airline.image_url ? (
                      <img
                        src={airline.image_url}
                        alt={airline.nombre}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <Plane className="h-12 w-12 text-primary/40" />
                    )}
                  </div>

                  <CardContent className="border-t pt-5">
                    <h3 className="font-semibold">
                      {airline.nombre}
                    </h3>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {airline.pais}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <EmptyState message="No hay aerolíneas disponibles." />
          )}
        </div>
      </section>

      {/* Información para viajar */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Prepara tu viaje
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight">
            Todo lo que necesitas antes de volar
          </h2>

          <p className="mt-4 text-muted-foreground">
            Encuentra información útil sobre equipaje, seguridad, horarios y
            canales de atención.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <InformationCard
            icon={<BaggageClaim className="h-6 w-6" />}
            title="Equipaje"
            description="Consulta recomendaciones, restricciones y preparación de tu equipaje."
          />

          <InformationCard
            icon={<Clock3 className="h-6 w-6" />}
            title="Llegada al aeropuerto"
            description="Conoce con cuánto tiempo debes llegar antes de tu vuelo."
          />

          <InformationCard
            icon={<ShieldCheck className="h-6 w-6" />}
            title="Seguridad"
            description="Revisa documentos y requisitos necesarios para viajar."
          />

          <InformationCard
            icon={<Headphones className="h-6 w-6" />}
            title="Ayuda y contacto"
            description="Comunícate con nuestro equipo para resolver tus inquietudes."
          />
        </div>

        <div className="mt-10 flex justify-center">
          <Button asChild variant="outline">
            <Link to="/informacion">
              Ver información para pasajeros
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 py-12 md:flex-row md:items-center lg:px-8">
          <div>
            <h2 className="text-2xl font-bold">
              ¿Necesitas ayuda con tu viaje?
            </h2>

            <p className="mt-2 text-primary-foreground/80">
              Consulta nuestros canales de atención y encuentra respuestas a
              tus preguntas.
            </p>
          </div>

          <Button asChild size="lg" variant="secondary">
            <Link to="/contacto">
              Contáctanos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

interface StatCardProps {
  icon: React.ReactNode
  value: number | string
  label: string
}

function StatCard({ icon, value, label }: StatCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-xl border bg-background p-5 shadow-sm">
      <div className="rounded-xl bg-primary/10 p-3 text-primary">
        {icon}
      </div>

      <div>
        <p className="text-2xl font-bold">
          {value}
        </p>

        <p className="text-sm text-muted-foreground">
          {label}
        </p>
      </div>
    </div>
  )
}

interface SectionHeaderProps {
  eyebrow: string
  title: string
  description: string
  link: string
  linkText: string
}

function SectionHeader({
  eyebrow,
  title,
  description,
  link,
  linkText,
}: SectionHeaderProps) {
  return (
    <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">
          {eyebrow}
        </p>

        <h2 className="mt-2 text-3xl font-bold tracking-tight">
          {title}
        </h2>

        <p className="mt-3 text-muted-foreground">
          {description}
        </p>
      </div>

      <Button asChild variant="ghost">
        <Link to={link}>
          {linkText}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </div>
  )
}

interface FlightDetailProps {
  icon: React.ReactNode
  label: string
  value: string
}

function FlightDetail({
  icon,
  label,
  value,
}: FlightDetailProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 text-primary">
        {icon}
      </div>

      <div>
        <p className="text-xs text-muted-foreground">
          {label}
        </p>

        <p className="text-sm font-medium">
          {value}
        </p>
      </div>
    </div>
  )
}

interface InformationCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

function InformationCard({
  icon,
  title,
  description,
}: InformationCardProps) {
  return (
    <Card className="transition hover:-translate-y-1 hover:shadow-md">
      <CardHeader>
        <div className="mb-2 w-fit rounded-xl bg-primary/10 p-3 text-primary">
          {icon}
        </div>

        <CardTitle className="text-lg">
          {title}
        </CardTitle>

        <CardDescription className="leading-6">
          {description}
        </CardDescription>
      </CardHeader>
    </Card>
  )
}

function LoadingCards() {
  return (
    <div className="mt-8 grid gap-6 md:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="h-64 animate-pulse rounded-xl border bg-muted"
        />
      ))}
    </div>
  )
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="mt-8 rounded-xl border border-dashed p-10 text-center">
      <Plane className="mx-auto h-10 w-10 text-muted-foreground/50" />

      <p className="mt-3 text-sm text-muted-foreground">
        {message}
      </p>
    </div>
  )
}

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString('es-EC', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

function getStatusClass(status: string) {
  const normalizedStatus = status.toLowerCase()

  if (
    normalizedStatus.includes('cancelado') ||
    normalizedStatus.includes('cancelled')
  ) {
    return 'bg-destructive/10 text-destructive'
  }

  if (
    normalizedStatus.includes('completado') ||
    normalizedStatus.includes('finalizado')
  ) {
    return 'bg-emerald-500/10 text-emerald-700'
  }

  if (
    normalizedStatus.includes('demorado') ||
    normalizedStatus.includes('retrasado')
  ) {
    return 'bg-amber-500/10 text-amber-700'
  }

  return 'bg-primary/10 text-primary'
}