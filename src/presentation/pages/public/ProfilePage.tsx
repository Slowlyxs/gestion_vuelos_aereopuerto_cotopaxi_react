// src/presentation/pages/public/ProfilePage.tsx

import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import {
  CalendarDays,
  Plane,
  Ticket,
  User,
} from 'lucide-react'

import { useAuthStore } from '@/presentation/store/auth.store'
import { useReservationStore } from '@/presentation/store/reservation.store'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/presentation/components/ui/card'

const ESTADO_STYLES: Record<string, string> = {
  CONFIRMADA: 'bg-green-100 text-green-700',
  PENDIENTE: 'bg-yellow-100 text-yellow-700',
  CANCELADA: 'bg-red-100 text-red-700',
}

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user)

  const {
    reservations,
    isLoading,
    loadMyReservations,
  } = useReservationStore()

  useEffect(() => {
    loadMyReservations()
  }, [loadMyReservations])

  return (
    <div className="bg-background">
      {/* Header */}
      <section className="border-b bg-gradient-to-br from-primary/10 to-background">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <User className="h-7 w-7" />
            </div>

            <div>
              <h1 className="text-3xl font-bold">
                {user?.username ?? 'Mi perfil'}
              </h1>

              <p className="text-muted-foreground">
                {user?.email}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reservas */}
      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold">
            Mis reservas
          </h2>
        </div>

        {isLoading ? (
          <div className="grid gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="h-28 animate-pulse rounded-xl border bg-muted"
              />
            ))}
          </div>
        ) : reservations.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
              <Ticket className="h-10 w-10 text-muted-foreground/40" />

              <p className="font-medium">
                Todavía no tienes reservas
              </p>

              <p className="text-sm text-muted-foreground">
                Cuando reserves un vuelo, aparecerá aquí.
              </p>

              <Link
                to="/vuelos"
                className="mt-2 text-sm font-medium text-primary hover:underline"
              >
                Ver vuelos disponibles
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {reservations.map((reservation) => (
              <Card key={reservation.id}>
                <CardHeader className="flex flex-row items-start justify-between space-y-0">
                  <div>
                    <CardTitle className="text-lg">
                      {reservation.vuelo.codigo_vuelo}
                    </CardTitle>

                    <CardDescription>
                      Código de reserva: {reservation.codigo_reserva}
                    </CardDescription>
                  </div>

                  <span
                    className={[
                      'rounded-full px-3 py-1 text-xs font-semibold',
                      ESTADO_STYLES[reservation.estado] ??
                        'bg-muted text-muted-foreground',
                    ].join(' ')}
                  >
                    {reservation.estado}
                  </span>
                </CardHeader>

                <CardContent className="flex flex-wrap items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-primary" />
                    {reservation.vuelo.fecha}
                  </div>

                  <div className="flex items-center gap-2">
                    <Plane className="h-4 w-4 text-primary" />
                    {reservation.cantidad_pasajeros}{' '}
                    {reservation.cantidad_pasajeros === 1
                      ? 'pasajero'
                      : 'pasajeros'}
                  </div>

                  <div className="ml-auto text-lg font-bold">
                    ${reservation.precio_total}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}