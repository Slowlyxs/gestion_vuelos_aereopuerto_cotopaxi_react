// src/presentation/pages/public/AirlinesPage.tsx

import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Building2,
  Globe2,
  MapPin,
  Plane,
  RotateCcw,
  Search,
} from 'lucide-react'

import { useAirlineStore } from '@/presentation/store/airline.store'
import { useFlightStore } from '@/presentation/store/flight.store'

import { Button } from '@/presentation/components/ui/button'
import { Input } from '@/presentation/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/presentation/components/ui/card'

export default function AirlinesPagePublic() {
  const {
    airlines,
    loadAirlines,
    isLoading: airlinesLoading,
    error,
  } = useAirlineStore()

  const {
    flights,
    loadFlights,
    isLoading: flightsLoading,
  } = useFlightStore()

  const [search, setSearch] = useState('')
  const [country, setCountry] = useState('')

  useEffect(() => {
    loadAirlines()
    loadFlights()
  }, [loadAirlines, loadFlights])

  const availableCountries = useMemo(() => {
    return Array.from(
      new Set(
        airlines
          .map((airline) => airline.pais)
          .filter(Boolean),
      ),
    ).sort((firstCountry, secondCountry) =>
      firstCountry.localeCompare(secondCountry),
    )
  }, [airlines])

  const filteredAirlines = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()

    return airlines.filter((airline) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        airline.nombre.toLowerCase().includes(normalizedSearch) ||
        airline.pais.toLowerCase().includes(normalizedSearch)

      const matchesCountry =
        country.length === 0 || airline.pais === country

      return matchesSearch && matchesCountry
    })
  }, [airlines, search, country])

  const countriesCount = useMemo(() => {
    return new Set(
      airlines
        .map((airline) => airline.pais)
        .filter(Boolean),
    ).size
  }, [airlines])

  const getAirlineFlightsCount = (airlineId: number) => {
    return flights.filter(
      (flight) =>
        flight.id_avion.aerolinea.id === airlineId,
    ).length
  }

  const hasFilters = search.length > 0 || country.length > 0

  function clearFilters() {
    setSearch('')
    setCountry('')
  }

  return (
    <div className="bg-background">
      {/* Encabezado */}
      <section className="relative overflow-hidden border-b bg-gradient-to-br from-primary/15 via-background to-secondary/10">
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border bg-background/80 px-4 py-2 text-sm shadow-sm backdrop-blur">
              <Building2 className="h-4 w-4 text-primary" />
              Aerolíneas disponibles
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Conoce nuestras aerolíneas
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
              Consulta las aerolíneas registradas, su país de origen y los
              vuelos disponibles dentro de nuestra plataforma.
            </p>
          </div>
        </div>
      </section>

      {/* Estadísticas */}
      <section className="border-b bg-muted/30">
        <div className="mx-auto grid max-w-7xl gap-4 px-6 py-8 sm:grid-cols-3 lg:px-8">
          <StatisticCard
            icon={<Building2 className="h-5 w-5" />}
            value={airlinesLoading ? '—' : airlines.length}
            label="Aerolíneas registradas"
          />

          <StatisticCard
            icon={<Globe2 className="h-5 w-5" />}
            value={airlinesLoading ? '—' : countriesCount}
            label="Países representados"
          />

          <StatisticCard
            icon={<Plane className="h-5 w-5" />}
            value={flightsLoading ? '—' : flights.length}
            label="Vuelos disponibles"
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        {/* Filtros */}
        <Card>
          <CardHeader>
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-primary/10 p-3 text-primary">
                <Search className="h-5 w-5" />
              </div>

              <div>
                <CardTitle>Buscar aerolíneas</CardTitle>

                <CardDescription>
                  Filtra las aerolíneas por nombre o país de origen.
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="grid gap-4 md:grid-cols-[1fr_280px_auto]">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

                <Input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Buscar por nombre o país..."
                  className="pl-9"
                />
              </div>

              <select
                value={country}
                onChange={(event) => setCountry(event.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none transition focus:ring-2 focus:ring-ring"
              >
                <option value="">
                  Todos los países
                </option>

                {availableCountries.map((countryName) => (
                  <option
                    key={countryName}
                    value={countryName}
                  >
                    {countryName}
                  </option>
                ))}
              </select>

              {hasFilters && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={clearFilters}
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Limpiar
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Encabezado de resultados */}
        <div className="mt-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Resultados
          </p>

          <h2 className="mt-1 text-2xl font-bold">
            Aerolíneas registradas
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Se encontraron {filteredAirlines.length}{' '}
            {filteredAirlines.length === 1
              ? 'aerolínea'
              : 'aerolíneas'}
            .
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-8 rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        )}

        {/* Cargando */}
        {airlinesLoading && (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-96 animate-pulse rounded-xl border bg-muted"
              />
            ))}
          </div>
        )}

        {/* Lista de aerolíneas */}
        {!airlinesLoading && filteredAirlines.length > 0 && (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredAirlines.map((airline) => {
              const airlineFlights =
                getAirlineFlightsCount(airline.id_aerolinea)

              return (
                <Card
                  key={airline.id_aerolinea}
                  className="group overflow-hidden transition duration-200 hover:-translate-y-1 hover:shadow-lg"
                >
                  {/* Imagen */}
                  <div className="relative flex h-52 items-center justify-center overflow-hidden bg-gradient-to-br from-primary/10 via-muted/40 to-secondary/10">
                    {airline.image_url ? (
                      <img
                        src={airline.image_url}
                        alt={`Aerolínea ${airline.nombre}`}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-3 text-primary/50">
                        <div className="rounded-full bg-background/70 p-5 shadow-sm backdrop-blur">
                          <Plane className="h-12 w-12" />
                        </div>

                        <span className="text-sm font-medium">
                          Sin imagen disponible
                        </span>
                      </div>
                    )}

                    <div className="absolute left-4 top-4 rounded-full border bg-background/90 px-3 py-1 text-xs font-medium shadow-sm backdrop-blur">
                      ID #{airline.id_aerolinea}
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className="text-xl">
                      {airline.nombre}
                    </CardTitle>

                    <CardDescription className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      {airline.pais}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-5">
                    <div className="grid grid-cols-2 gap-3">
                      <AirlineInformation
                        label="País"
                        value={airline.pais}
                      />

                      <AirlineInformation
                        label="Vuelos"
                        value={
                          flightsLoading
                            ? '—'
                            : airlineFlights.toString()
                        }
                      />
                    </div>

                    <Button
                      asChild
                      className="w-full"
                    >
                      <Link to="/vuelos">
                        Consultar vuelos
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        {/* Sin resultados */}
        {!airlinesLoading && filteredAirlines.length === 0 && (
          <div className="mt-8 rounded-xl border border-dashed px-6 py-16 text-center">
            <Plane className="mx-auto h-12 w-12 text-muted-foreground/40" />

            <h3 className="mt-4 text-lg font-semibold">
              No encontramos aerolíneas
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
              Prueba escribiendo otro nombre o seleccionando un país
              diferente.
            </p>

            {hasFilters && (
              <Button
                type="button"
                variant="outline"
                className="mt-6"
                onClick={clearFilters}
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Mostrar todas
              </Button>
            )}
          </div>
        )}
      </section>

      {/* Llamado a la acción */}
      <section className="border-t bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 py-12 md:flex-row md:items-center lg:px-8">
          <div>
            <h2 className="text-2xl font-bold">
              Encuentra el vuelo ideal para tu viaje
            </h2>

            <p className="mt-2 text-primary-foreground/80">
              Consulta fechas, estados, aeronaves y aerolíneas disponibles.
            </p>
          </div>

          <Button
            asChild
            size="lg"
            variant="secondary"
          >
            <Link to="/vuelos">
              Ver vuelos disponibles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

interface StatisticCardProps {
  icon: React.ReactNode
  value: number | string
  label: string
}

function StatisticCard({
  icon,
  value,
  label,
}: StatisticCardProps) {
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

interface AirlineInformationProps {
  label: string
  value: string
}

function AirlineInformation({
  label,
  value,
}: AirlineInformationProps) {
  return (
    <div className="rounded-lg border bg-muted/30 p-3">
      <p className="text-xs text-muted-foreground">
        {label}
      </p>

      <p className="mt-1 truncate text-sm font-semibold">
        {value}
      </p>
    </div>
  )
}