import { useEffect } from 'react'

import { useFlightStore } from '@/presentation/store/flight.store'

export default function FlightsPage() {
  const {
    flights,
    loadFlights,
    isLoading,
    error,
  } = useFlightStore()

  useEffect(() => {
    loadFlights()
  }, [loadFlights])

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-2xl font-bold">
          Vuelos
        </h1>

        <p className="text-muted-foreground">
          Gestión de vuelos registrados
        </p>
      </div>

      {error && (
        <div className="rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {isLoading ? (
        <p>Cargando vuelos...</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border">

          <table className="w-full">

            <thead className="border-b bg-muted">
              <tr>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Código</th>
                <th className="p-3 text-left">Fecha</th>
                <th className="p-3 text-left">Estado</th>
                <th className="p-3 text-left">Avión</th>
              </tr>
            </thead>

            <tbody>

              {flights.map((flight) => (

                <tr
                  key={flight.id}
                  className="border-b last:border-b-0"
                >

                  <td className="p-3">
                    {flight.id}
                  </td>

                  <td className="p-3">
                    {flight.codigo_vuelo}
                  </td>

                  <td className="p-3">
                    {new Date(
                      `${flight.fecha}T00:00:00`,
                    ).toLocaleDateString()}
                  </td>

                  <td className="p-3">
                    {flight.estado}
                  </td>

                  <td className="p-3">

                    <div className="space-y-1">

                      <p className="font-semibold">
                        {flight.id_avion.modelo}
                      </p>

                      <p className="text-sm text-muted-foreground">
                        Matrícula: {flight.id_avion.matricula}
                      </p>

                      <p className="text-sm text-muted-foreground">
                        Capacidad: {flight.id_avion.capacidad}
                      </p>

                      <p className="text-sm">
                        Aerolínea: {flight.id_avion.aerolinea.nombre}
                      </p>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

          {flights.length === 0 && (
            <p className="p-6 text-center text-sm text-muted-foreground">
              No hay vuelos registrados.
            </p>
          )}

        </div>
      )}
    </div>
  )
}