import { useEffect } from 'react'

import { useRunwayStore } from '@/presentation/store/runway.store'

export default function RunwaysPage() {
  const {
    runways,
    loadRunways,
    isLoading,
    error,
  } = useRunwayStore()

  useEffect(() => {
    loadRunways()
  }, [loadRunways])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          Pistas
        </h1>

        <p className="text-muted-foreground">
          Gestión de pistas del aeropuerto
        </p>
      </div>

      {error && (
        <div className="rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {isLoading ? (
        <p>Cargando pistas...</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full">
            <thead className="border-b bg-muted">
              <tr>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Código</th>
                <th className="p-3 text-left">Estado</th>
              </tr>
            </thead>

            <tbody>
              {runways.map((runway) => (
                <tr
                  key={runway.id_pista}
                  className="border-b last:border-b-0"
                >
                  <td className="p-3">
                    {runway.id_pista}
                  </td>

                  <td className="p-3 font-medium">
                    {runway.codigo}
                  </td>

                  <td className="p-3">
                    <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
                      {runway.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {runways.length === 0 && (
            <p className="p-6 text-center text-sm text-muted-foreground">
              No hay pistas registradas.
            </p>
          )}
        </div>
      )}
    </div>
  )
}