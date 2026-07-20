// src/presentation/pages/public/FlightsPage.tsx

import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  ArrowRight,
  Building2,
  CalendarDays,
  Filter,
  Plane,
  RotateCcw,
  Search,
  Users,
} from 'lucide-react'

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

export default function FlightsPage() {
  const [searchParams, setSearchParams] = useSearchParams()

  const {
    flights,
    loadFlights,
    isLoading,
    error,
  } = useFlightStore()

  const originParam = searchParams.get('origen') ?? ''
  const destinationParam = searchParams.get('destino') ?? ''
  const dateParam = searchParams.get('fecha') ?? ''

  const [search, setSearch] = useState('')
  const [date, setDate] = useState(dateParam)
  const [status, setStatus] = useState('')
  const [airline, setAirline] = useState('')

  useEffect(() => {
    loadFlights()
  }, [loadFlights])

  useEffect(() => {
    setDate(dateParam)
  }, [dateParam])

  const availableStatuses = useMemo(() => {
    return Array.from(
      new Set(
        flights
          .map((flight) => flight.estado)
          .filter(Boolean),
      ),
    ).sort()
  }, [flights])

  const availableAirlines = useMemo(() => {
    return Array.from(
      new Set(
        flights
          .map((flight) => flight.id_avion.aerolinea.nombre)
          .filter(Boolean),
      ),
    ).sort()
  }, [flights])

  const filteredFlights = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()

    return flights.filter((flight) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        flight.codigo_vuelo.toLowerCase().includes(normalizedSearch) ||
        flight.estado.toLowerCase().includes(normalizedSearch) ||
        flight.id_avion.modelo.toLowerCase().includes(normalizedSearch) ||
        flight.id_avion.matricula.toLowerCase().includes(normalizedSearch) ||
        flight.id_avion.aerolinea.nombre
          .toLowerCase()
          .includes(normalizedSearch)

      const matchesDate =
        date.length === 0 || flight.fecha === date

      const matchesStatus =
        status.length === 0 || flight.estado === status

      const matchesAirline =
        airline.length === 0 ||
        flight.id_avion.aerolinea.nombre === airline

      return (
        matchesSearch &&
        matchesDate &&
        matchesStatus &&
        matchesAirline
      )
    })
  }, [flights, search, date, status, airline])

  function clearFilters() {
    setSearch('')
    setDate('')
    setStatus('')
    setAirline('')
    setSearchParams({})
  }

  const hasFilters =
    search.length > 0 ||
    date.length > 0 ||
    status.length > 0 ||
    airline.length > 0 ||
    originParam.length > 0 ||
    destinationParam.length > 0

  return (
    <div className="bg-background">
      {/* Encabezado */}
      <section className="border-b bg-gradient-to-br from-primary/15 via-background to-secondary/10">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-background/80 px-4 py-2 text-sm shadow-sm">
              <Plane className="h-4 w-4 text-primary" />
              Consulta de vuelos
            </div>

            <h1 className="text-4xl font-bold tracking-tight">
              Encuentra tu próximo vuelo
            </h1>

            <p className="mt-4 text-lg text-muted-foreground">
              Consulta fechas, estados, aeronaves y aerolíneas disponibles.
            </p>

            {(originParam || destinationParam) && (
              <div className="mt-6 flex flex-wrap items-center gap-2 text-sm">
                <span className="text-muted-foreground">
                  Ruta consultada:
                </span>

                <span className="rounded-full bg-primary/10 px-3 py-1 font-medium text-primary">
                  {originParam || 'Cualquier origen'}
                </span>

                <ArrowRight className="h-4 w-4 text-muted-foreground" />

                <span className="rounded-full bg-primary/10 px-3 py-1 font-medium text-primary">
                  {destinationParam || 'Cualquier destino'}
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        {/* Filtros */}
        <Card>
          <CardHeader>
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-primary/10 p-3 text-primary">
                <Filter className="h-5 w-5" />
              </div>

              <div>
                <CardTitle>Filtrar vuelos</CardTitle>

                <CardDescription>
                  Busca por código, aerolínea, avión, matrícula, fecha o
                  estado.
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <Label htmlFor="flight-search">
                  Buscar
                </Label>

                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

                  <Input
                    id="flight-search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="LA102, Boeing, matrícula..."
                    className="pl-9"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="flight-date">
                  Fecha
                </Label>

                <Input
                  id="flight-date"
                  type="date"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="flight-status">
                  Estado
                </Label>

                <select
                  id="flight-status"
                  value={status}
                  onChange={(event) => setStatus(event.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">
                    Todos los estados
                  </option>

                  {availableStatuses.map((item) => (
                    <option key={item} value={item}>
                      {capitalize(item)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="flight-airline">
                  Aerolínea
                </Label>

                <select
                  id="flight-airline"
                  value={airline}
                  onChange={(event) => setAirline(event.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">
                    Todas las aerolíneas
                  </option>

                  {availableAirlines.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {hasFilters && (
              <div className="mt-5 flex justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={clearFilters}
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Limpiar filtros
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Cabecera de resultados */}
        <div className="mt-10 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Resultados
            </p>

            <h2 className="mt-1 text-2xl font-bold">
              Vuelos disponibles
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Se encontraron {filteredFlights.length}{' '}
              {filteredFlights.length === 1 ? 'vuelo' : 'vuelos'}.
            </p>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-8 rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        )}

        {/* Cargando */}
        {isLoading && (
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-80 animate-pulse rounded-xl border bg-muted"
              />
            ))}
          </div>
        )}

        {/* Vuelos */}
        {!isLoading && filteredFlights.length > 0 && (
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredFlights.map((flight) => (
              <Card
                key={flight.id}
                className="overflow-hidden transition duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <CardHeader className="border-b bg-muted/30">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Código de vuelo
                      </p>

                      <CardTitle className="mt-1 text-2xl">
                        {flight.codigo_vuelo}
                      </CardTitle>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                        flight.estado,
                      )}`}
                    >
                      {capitalize(flight.estado)}
                    </span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-5 pt-6">
                  <FlightInformation
                    icon={<CalendarDays className="h-4 w-4" />}
                    label="Fecha"
                    value={formatDate(flight.fecha)}
                  />

                  <FlightInformation
                    icon={<Plane className="h-4 w-4" />}
                    label="Aeronave"
                    value={`${flight.id_avion.modelo} · ${flight.id_avion.matricula}`}
                  />

                  <FlightInformation
                    icon={<Users className="h-4 w-4" />}
                    label="Capacidad"
                    value={`${flight.id_avion.capacidad} pasajeros`}
                  />

                  <FlightInformation
                    icon={<Building2 className="h-4 w-4" />}
                    label="Aerolínea"
                    value={`${flight.id_avion.aerolinea.nombre} · ${flight.id_avion.aerolinea.pais}`}
                  />

                  <Button asChild className="w-full">
                    <Link to={`/vuelos/${flight.id}`}>
                      Ver detalle del vuelo
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Vacío */}
        {!isLoading && filteredFlights.length === 0 && (
          <div className="mt-8 rounded-xl border border-dashed px-6 py-16 text-center">
            <Plane className="mx-auto h-12 w-12 text-muted-foreground/40" />

            <h3 className="mt-4 text-lg font-semibold">
              No encontramos vuelos
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
              Prueba cambiando la fecha, el estado, la aerolínea o el texto
              de búsqueda.
            </p>

            {hasFilters && (
              <Button
                type="button"
                variant="outline"
                className="mt-6"
                onClick={clearFilters}
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Mostrar todos los vuelos
              </Button>
            )}
          </div>
        )}
      </section>
    </div>
  )
}

interface FlightInformationProps {
  icon: React.ReactNode
  label: string
  value: string
}

function FlightInformation({
  icon,
  label,
  value,
}: FlightInformationProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 rounded-lg bg-primary/10 p-2 text-primary">
        {icon}
      </div>

      <div>
        <p className="text-xs text-muted-foreground">
          {label}
        </p>

        <p className="mt-1 text-sm font-medium">
          {value}
        </p>
      </div>
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