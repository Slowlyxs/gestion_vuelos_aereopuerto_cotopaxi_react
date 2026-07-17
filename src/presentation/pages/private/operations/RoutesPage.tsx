import { useEffect } from 'react'

import { useRouteStore } from '@/presentation/store/route.store'

export default function RoutesPage() {
  const {
    routes,
    loadRoutes,
    isLoading,
    error,
  } = useRouteStore()

  useEffect(() => {
    loadRoutes()
  }, [loadRoutes])


  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-2xl font-bold">
          Rutas
        </h1>

        <p className="text-muted-foreground">
          Gestión de rutas de vuelo
        </p>
      </div>

      {error && (
        <div className="rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {isLoading ? (
        <p>Cargando rutas...</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border">

          <table className="w-full">

            <thead className="border-b bg-muted">
              <tr>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Origen</th>
                <th className="p-3 text-left">Destino</th>
              </tr>
            </thead>

            <tbody>

              {routes.map((route) => (

                <tr
                  key={route.id}
                  className="border-b last:border-b-0"
                >

                  <td className="p-3">
                    {route.id}
                  </td>

                  <td className="p-3">

                    <div className="space-y-1">

                      <p className="font-semibold">
                        {route.origen.nombre}
                      </p>

                      <p className="text-sm text-muted-foreground">
                        {route.origen.ciudad}, {route.origen.pais}
                      </p>

                      <p className="text-sm">
                        IATA: {route.origen.codigo_iata}
                      </p>

                    </div>

                  </td>

                  <td className="p-3">

                    <div className="space-y-1">

                      <p className="font-semibold">
                        {route.destino.nombre}
                      </p>

                      <p className="text-sm text-muted-foreground">
                        {route.destino.ciudad}, {route.destino.pais}
                      </p>

                      <p className="text-sm">
                        IATA: {route.destino.codigo_iata}
                      </p>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

          {routes.length === 0 && (
            <p className="p-6 text-center text-sm text-muted-foreground">
              No hay rutas registradas.
            </p>
          )}

        </div>
      )}
    </div>
  )
}