// src/presentation/pages/public/ReservationsPage.tsx

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  CalendarDays,
  MapPin,
  Plane,
  Users,
  Building2,
  CheckCircle2,
} from 'lucide-react'

import { useFlightStore } from '@/presentation/store/flight.store'
import { useAuthStore } from '@/presentation/store/auth.store'
import { useReservationStore } from '@/presentation/store/reservation.store'

import { Button } from '@/presentation/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/presentation/components/ui/card'
import { toast } from 'sonner'

export default function ReservationsPage() {
  const navigate = useNavigate()

  const user = useAuthStore((state) => state.user)

  const { flights, loadFlights, isLoading } = useFlightStore()
  const { createReservation } = useReservationStore()

  const [selectedFlight, setSelectedFlight] = useState<number | null>(null)
  const [passengers, setPassengers] = useState(1)

  useEffect(() => {
    loadFlights()
  }, [loadFlights])

  // ⚠️ Filtramos cualquier vuelo nulo o incompleto que venga del backend
  const validFlights = flights.filter(
    (flight) => flight && flight.ruta && flight.id_avion,
  )

  const selected = validFlights.find((f) => f.id === selectedFlight)

  async function handleReserve() {
    if (!user) {
      navigate('/login')
      return
    }

    if (!selectedFlight) {
      alert('Selecciona un vuelo')
      return
    }

    try {
      await createReservation({
        vuelo: selectedFlight,
        cantidad_pasajeros: passengers,
      })

      toast.success('Reserva realizada correctamente')
      navigate('/perfil')
    } catch (err) {
      const message = err instanceof Error ? err.message : 'No se pudo realizar la reserva'
      toast.error(message)
    }
  }

  return (
    <div className="bg-background">
      {/* Header — mismo estilo que FlightsPage */}
      <section className="border-b bg-gradient-to-br from-primary/15 via-background to-secondary/10">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-background/80 px-4 py-2 text-sm shadow-sm">
            <Plane className="h-4 w-4 text-primary" />
            Reservar vuelo
          </div>

          <h1 className="text-4xl font-bold tracking-tight">
            Selecciona tu vuelo
          </h1>

          <p className="mt-4 text-lg text-muted-foreground">
            Elige un vuelo disponible y confirma tu reserva.
          </p>
        </div>
      </section>

      {/* Lista de vuelos */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        {isLoading && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-72 animate-pulse rounded-xl border bg-muted"
              />
            ))}
          </div>
        )}

        {!isLoading && validFlights.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {validFlights.map((flight) => {
              const isSelected = selectedFlight === flight.id

              return (
                <Card
                  key={flight.id}
                  onClick={() => setSelectedFlight(flight.id)}
                  className={[
                    'cursor-pointer overflow-hidden transition duration-200 hover:-translate-y-1 hover:shadow-lg',
                    isSelected ? 'border-primary ring-2 ring-primary' : '',
                  ].join(' ')}
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

                      {isSelected && (
                        <CheckCircle2 className="h-6 w-6 text-primary" />
                      )}
                    </div>

                    <CardDescription>
                      {flight.id_avion?.aerolinea?.nombre ?? 'Aerolínea N/D'}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4 pt-6">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span>
                        {flight.ruta?.origen?.ciudad ?? 'N/D'}
                        {' → '}
                        {flight.ruta?.destino?.ciudad ?? 'N/D'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-primary" />
                      <span>{flight.fecha}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Plane className="h-4 w-4 text-primary" />
                      <span>{flight.id_avion?.modelo ?? 'N/D'}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" />
                      <span>
                        {flight.asientos_disponibles} asientos disponibles
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-primary" />
                      <span>{flight.id_avion?.aerolinea?.pais ?? 'N/D'}</span>
                    </div>

                    <div className="pt-2">
                      <p className="text-2xl font-bold">${flight.precio}</p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        {!isLoading && validFlights.length === 0 && (
          <div className="rounded-xl border border-dashed px-6 py-16 text-center">
            <Plane className="mx-auto h-12 w-12 text-muted-foreground/40" />
            <h3 className="mt-4 text-lg font-semibold">
              No hay vuelos disponibles
            </h3>
          </div>
        )}
      </section>

      {/* Confirmación */}
      <section className="border-t bg-muted/30">
        <div className="mx-auto max-w-3xl px-6 py-10">
          <Card>
            <CardHeader>
              <CardTitle>Confirmar reserva</CardTitle>
              <CardDescription>
                {selected
                  ? `Vuelo seleccionado: ${selected.codigo_vuelo}`
                  : 'Selecciona un vuelo arriba para continuar.'}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Cantidad de pasajeros
                </label>

                <input
                  type="number"
                  min={1}
                  value={passengers}
                  onChange={(e) => setPassengers(Number(e.target.value))}
                  className="w-full rounded-md border p-2"
                />
              </div>

              <Button
                className="w-full"
                disabled={!selected}
                onClick={handleReserve}
              >
                Reservar ahora
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}