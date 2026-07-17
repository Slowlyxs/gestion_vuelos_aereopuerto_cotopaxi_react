import { useEffect } from 'react'

import { useFlightAuthorizationStore } from '@/presentation/store/flight-authorization.store'

export default function FlightAuthorizationsPage() {
  const {
    authorizations,
    loadAuthorizations,
    isLoading,
    error,
  } = useFlightAuthorizationStore()

  useEffect(() => {
    loadAuthorizations()
  }, [loadAuthorizations])

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-2xl font-bold">
          Autorizaciones de vuelo
        </h1>

        <p className="text-muted-foreground">
          Gestión de autorizaciones
        </p>
      </div>

      {error && (
        <div className="rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {isLoading ? (
        <p>Cargando autorizaciones...</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border">

          <table className="w-full">

            <thead className="border-b bg-muted">
              <tr>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Tipo</th>
                <th className="p-3 text-left">Fecha</th>
                <th className="p-3 text-left">Estado</th>
                <th className="p-3 text-left">Vuelo</th>
              </tr>
            </thead>

            <tbody>

              {authorizations.map((authorization) => (

                <tr
                  key={authorization.id_autorizacion}
                  className="border-b last:border-b-0"
                >

                  <td className="p-3">
                    {authorization.id_autorizacion}
                  </td>

                  <td className="p-3">
                    {authorization.tipo_autorizacion}
                  </td>

                  <td className="p-3">
                    {new Date(
                      authorization.fecha
                    ).toLocaleDateString()}
                  </td>

                  <td className="p-3">
                    {authorization.estado}
                  </td>

                  <td className="p-3">

                    <div className="space-y-1">

                      <p className="font-semibold">
                        {authorization.id_vuelo.codigo_vuelo}
                      </p>

                      <p className="text-sm text-muted-foreground">
                        Estado: {authorization.id_vuelo.estado}
                      </p>

                      <p className="text-sm text-muted-foreground">
                        Avión: {authorization.id_vuelo.id_avion.modelo}
                      </p>

                      <p className="text-sm">
                        Aerolínea: {authorization.id_vuelo.id_avion.aerolinea.nombre}
                      </p>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

          {authorizations.length === 0 && (
            <p className="p-6 text-center text-sm text-muted-foreground">
              No hay autorizaciones registradas.
            </p>
          )}

        </div>
      )}
    </div>
  )
}