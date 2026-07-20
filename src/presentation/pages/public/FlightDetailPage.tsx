// src/presentation/pages/public/FlightDetailPage.tsx

import { useEffect, type ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CalendarDays,
  CheckCircle2,
  CircleAlert,
  Clock3,
  Globe2,
  Hash,
  Headphones,
  Info,
  Plane,
  ShieldCheck,
  Ticket,
  Users,
} from 'lucide-react'

import { useFlightStore } from '@/presentation/store/flight.store'

import { Button } from '@/presentation/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/presentation/components/ui/card'

export default function FlightDetailPage() {
  const { id } = useParams<{ id: string }>()

  const {
    flights,
    loadFlights,
    isLoading,
    error,
  } = useFlightStore()

  useEffect(() => {
    loadFlights()
  }, [loadFlights])

  const flightId = Number(id)

  const flight = flights.find(
    (currentFlight) => currentFlight.id === flightId,
  )

  if (isLoading && !flight) {
    return <FlightDetailSkeleton />
  }

  if (error && !flight) {
    return (
      <PageMessage
        icon={<CircleAlert className="h-12 w-12" />}
        title="No pudimos cargar el vuelo"
        description={error}
      />
    )
  }

  if (!flight || Number.isNaN(flightId)) {
    return (
      <PageMessage
        icon={<Plane className="h-12 w-12" />}
        title="Vuelo no encontrado"
        description="El vuelo que estás buscando no existe o ya no se encuentra disponible."
      />
    )
  }

  return (
    <div className="bg-background">
      {/* Encabezado */}
      <section className="relative overflow-hidden border-b bg-gradient-to-br from-primary/15 via-background to-secondary/10">
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <Button
            asChild
            variant="ghost"
            className="-ml-4 mb-8"
          >
            <Link to="/vuelos">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a vuelos
            </Link>
          </Button>

          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border bg-background/80 px-4 py-2 text-sm shadow-sm backdrop-blur">
                <Ticket className="h-4 w-4 text-primary" />
                Detalle del vuelo
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                  {flight.codigo_vuelo}
                </h1>

                <span
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${getStatusClass(
                    flight.estado,
                  )}`}
                >
                  {capitalize(flight.estado)}
                </span>
              </div>

              <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
                Información general del vuelo, aeronave y aerolínea
                responsable de la operación.
              </p>
            </div>

            <div className="rounded-xl border bg-background/80 px-6 py-4 shadow-sm backdrop-blur">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Fecha programada
              </p>

              <div className="mt-2 flex items-center gap-3">
                <CalendarDays className="h-5 w-5 text-primary" />

                <p className="text-lg font-semibold">
                  {formatDate(flight.fecha)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resumen */}
      <section className="border-b bg-muted/30">
        <div className="mx-auto grid max-w-7xl gap-4 px-6 py-8 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
          <SummaryCard
            icon={<Hash className="h-5 w-5" />}
            label="Código"
            value={flight.codigo_vuelo}
          />

          <SummaryCard
            icon={<CalendarDays className="h-5 w-5" />}
            label="Fecha"
            value={formatShortDate(flight.fecha)}
          />

          <SummaryCard
            icon={<Plane className="h-5 w-5" />}
            label="Aeronave"
            value={flight.id_avion.modelo}
          />

          <SummaryCard
            icon={<Building2 className="h-5 w-5" />}
            label="Aerolínea"
            value={flight.id_avion.aerolinea.nombre}
          />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-12 lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
        {/* Información principal */}
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-primary/10 p-3 text-primary">
                  <Plane className="h-5 w-5" />
                </div>

                <div>
                  <CardTitle>Información del vuelo</CardTitle>

                  <CardDescription>
                    Datos generales registrados para este vuelo.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="grid gap-5 sm:grid-cols-2">
                <DetailItem
                  icon={<Hash className="h-4 w-4" />}
                  label="Identificador"
                  value={`Vuelo #${flight.id}`}
                />

                <DetailItem
                  icon={<Ticket className="h-4 w-4" />}
                  label="Código del vuelo"
                  value={flight.codigo_vuelo}
                />

                <DetailItem
                  icon={<CalendarDays className="h-4 w-4" />}
                  label="Fecha programada"
                  value={formatDate(flight.fecha)}
                />

                <DetailItem
                  icon={<CheckCircle2 className="h-4 w-4" />}
                  label="Estado actual"
                  value={capitalize(flight.estado)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Avión */}
          <Card>
            <CardHeader>
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-primary/10 p-3 text-primary">
                  <Plane className="h-5 w-5" />
                </div>

                <div>
                  <CardTitle>Aeronave asignada</CardTitle>

                  <CardDescription>
                    Información del avión asignado a la operación.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="grid gap-5 sm:grid-cols-2">
                <DetailItem
                  icon={<Plane className="h-4 w-4" />}
                  label="Modelo"
                  value={flight.id_avion.modelo}
                />

                <DetailItem
                  icon={<Hash className="h-4 w-4" />}
                  label="Matrícula"
                  value={flight.id_avion.matricula}
                />

                <DetailItem
                  icon={<Users className="h-4 w-4" />}
                  label="Capacidad"
                  value={`${flight.id_avion.capacidad} pasajeros`}
                />

                <DetailItem
                  icon={<Info className="h-4 w-4" />}
                  label="Identificador del avión"
                  value={`Avión #${flight.id_avion.id}`}
                />
              </div>
            </CardContent>
          </Card>

          {/* Recomendaciones */}
          <Card>
            <CardHeader>
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-primary/10 p-3 text-primary">
                  <ShieldCheck className="h-5 w-5" />
                </div>

                <div>
                  <CardTitle>Antes de tu vuelo</CardTitle>

                  <CardDescription>
                    Recomendaciones generales para preparar tu viaje.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="grid gap-4 sm:grid-cols-3">
              <Recommendation
                icon={<Clock3 className="h-5 w-5" />}
                title="Llega con anticipación"
                description="Preséntate con suficiente tiempo para completar los procesos aeroportuarios."
              />

              <Recommendation
                icon={<ShieldCheck className="h-5 w-5" />}
                title="Revisa tus documentos"
                description="Verifica que tu identificación y documentación estén vigentes."
              />

              <Recommendation
                icon={<Ticket className="h-5 w-5" />}
                title="Confirma tu vuelo"
                description="Consulta nuevamente el estado del vuelo antes de dirigirte al aeropuerto."
              />
            </CardContent>
          </Card>
        </div>

        {/* Panel lateral */}
        <aside className="space-y-6">
          {/* Aerolínea */}
          <Card>
            <CardHeader>
              <div className="mb-2 w-fit rounded-xl bg-primary/10 p-3 text-primary">
                <Building2 className="h-5 w-5" />
              </div>

              <CardTitle>
                {flight.id_avion.aerolinea.nombre}
              </CardTitle>

              <CardDescription>
                Aerolínea responsable del vuelo
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-5">
              <DetailItem
                icon={<Building2 className="h-4 w-4" />}
                label="Nombre"
                value={flight.id_avion.aerolinea.nombre}
              />

              <DetailItem
                icon={<Globe2 className="h-4 w-4" />}
                label="País"
                value={flight.id_avion.aerolinea.pais}
              />

              <DetailItem
                icon={<Hash className="h-4 w-4" />}
                label="Identificador"
                value={`Aerolínea #${flight.id_avion.aerolinea.id}`}
              />

              <Button
                asChild
                variant="outline"
                className="w-full"
              >
                <Link to="/aerolineas">
                  Ver aerolíneas
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Estado */}
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <div className="mb-2 w-fit rounded-xl bg-primary/10 p-3 text-primary">
                <CheckCircle2 className="h-5 w-5" />
              </div>

              <CardTitle>Estado del vuelo</CardTitle>

              <CardDescription>
                Último estado disponible en el sistema.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div
                className={`rounded-xl px-4 py-5 text-center ${getStatusClass(
                  flight.estado,
                )}`}
              >
                <p className="text-lg font-bold">
                  {capitalize(flight.estado)}
                </p>
              </div>

              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                El estado puede cambiar debido a condiciones operativas,
                climáticas o aeroportuarias.
              </p>
            </CardContent>
          </Card>

          {/* Ayuda */}
          <Card>
            <CardHeader>
              <div className="mb-2 w-fit rounded-xl bg-primary/10 p-3 text-primary">
                <Headphones className="h-5 w-5" />
              </div>

              <CardTitle>¿Necesitas ayuda?</CardTitle>

              <CardDescription>
                Comunícate con nuestro equipo e incluye el código{' '}
                <strong>{flight.codigo_vuelo}</strong>.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-3">
              <Button
                asChild
                className="w-full"
              >
                <Link to="/contacto">
                  Contactar soporte
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="w-full"
              >
                <Link to="/informacion">
                  Información para viajar
                </Link>
              </Button>
            </CardContent>
          </Card>
        </aside>
      </section>
    </div>
  )
}

interface SummaryCardProps {
  icon: ReactNode
  label: string
  value: string
}

function SummaryCard({
  icon,
  label,
  value,
}: SummaryCardProps) {
  return (
    <div className="flex min-w-0 items-center gap-4 rounded-xl border bg-background p-5 shadow-sm">
      <div className="shrink-0 rounded-xl bg-primary/10 p-3 text-primary">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">
          {label}
        </p>

        <p className="mt-1 truncate font-semibold">
          {value}
        </p>
      </div>
    </div>
  )
}

interface DetailItemProps {
  icon: ReactNode
  label: string
  value: string
}

function DetailItem({
  icon,
  label,
  value,
}: DetailItemProps) {
  return (
    <div className="flex items-start gap-3 rounded-lg border bg-muted/20 p-4">
      <div className="mt-0.5 rounded-lg bg-primary/10 p-2 text-primary">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">
          {label}
        </p>

        <p className="mt-1 break-words text-sm font-semibold">
          {value}
        </p>
      </div>
    </div>
  )
}

interface RecommendationProps {
  icon: ReactNode
  title: string
  description: string
}

function Recommendation({
  icon,
  title,
  description,
}: RecommendationProps) {
  return (
    <div className="rounded-xl border bg-muted/20 p-5">
      <div className="w-fit rounded-lg bg-primary/10 p-2 text-primary">
        {icon}
      </div>

      <h3 className="mt-4 font-semibold">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </div>
  )
}

interface PageMessageProps {
  icon: ReactNode
  title: string
  description: string
}

function PageMessage({
  icon,
  title,
  description,
}: PageMessageProps) {
  return (
    <section className="mx-auto flex min-h-[65vh] max-w-7xl items-center justify-center px-6 py-16 lg:px-8">
      <div className="max-w-lg text-center">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-primary">
          {icon}
        </div>

        <h1 className="mt-6 text-3xl font-bold">
          {title}
        </h1>

        <p className="mt-3 leading-7 text-muted-foreground">
          {description}
        </p>

        <Button
          asChild
          className="mt-7"
        >
          <Link to="/vuelos">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a vuelos
          </Link>
        </Button>
      </div>
    </section>
  )
}

function FlightDetailSkeleton() {
  return (
    <div>
      <section className="border-b bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
          <div className="h-10 w-44 animate-pulse rounded-lg bg-muted" />
          <div className="mt-8 h-14 max-w-md animate-pulse rounded-lg bg-muted" />
          <div className="mt-4 h-6 max-w-xl animate-pulse rounded-lg bg-muted" />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-12 lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
        <div className="space-y-8">
          <div className="h-72 animate-pulse rounded-xl border bg-muted" />
          <div className="h-72 animate-pulse rounded-xl border bg-muted" />
        </div>

        <div className="space-y-6">
          <div className="h-80 animate-pulse rounded-xl border bg-muted" />
          <div className="h-60 animate-pulse rounded-xl border bg-muted" />
        </div>
      </section>
    </div>
  )
}

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString('es-EC', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

function formatShortDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString('es-EC', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function capitalize(value: string) {
  if (!value) return ''

  return value.charAt(0).toUpperCase() + value.slice(1)
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
    normalizedStatus.includes('finalizado') ||
    normalizedStatus.includes('aterrizado')
  ) {
    return 'bg-emerald-500/10 text-emerald-700'
  }

  if (
    normalizedStatus.includes('demorado') ||
    normalizedStatus.includes('retrasado')
  ) {
    return 'bg-amber-500/10 text-amber-700'
  }

  if (
    normalizedStatus.includes('vuelo') ||
    normalizedStatus.includes('despegado')
  ) {
    return 'bg-sky-500/10 text-sky-700'
  }

  return 'bg-primary/10 text-primary'
}