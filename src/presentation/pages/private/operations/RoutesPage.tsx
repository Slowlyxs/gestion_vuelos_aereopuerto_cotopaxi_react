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
          Gestión de rutas entre aeropuertos
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
                <th className="p-3 text-left">Código</th>
                <th className="p-3 text-left">Ciudad</th>
                <th className="p-3 text-left">Destino</th>
                <th className="p-3 text-left">Código</th>
                <th className="p-3 text-left">Ciudad</th>
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

                  <td className="p-3 font-medium">
                    {route.origen.nombre}
                  </td>

                  <td className="p-3">
                    {route.origen.codigo_iata}
                  </td>

                  <td className="p-3">
                    {route.origen.ciudad}
                  </td>

                  <td className="p-3 font-medium">
                    {route.destino.nombre}
                  </td>

                  <td className="p-3">
                    {route.destino.codigo_iata}
                  </td>

                  <td className="p-3">
                    {route.destino.ciudad}
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