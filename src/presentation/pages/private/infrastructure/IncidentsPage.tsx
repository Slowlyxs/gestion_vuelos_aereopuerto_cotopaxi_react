import { useEffect } from 'react'

import { useIncidentStore } from '@/presentation/store/incident.store'

export default function IncidentsPage() {
  const {
    incidents,
    loadIncidents,
    isLoading,
    error,
  } = useIncidentStore()

  useEffect(() => {
    loadIncidents()
  }, [loadIncidents])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          Incidentes
        </h1>

        <p className="text-muted-foreground">
          Registro de incidentes asociados a los vuelos
        </p>
      </div>

      {error && (
        <div className="rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {isLoading ? (
        <p>Cargando incidentes...</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full">
            <thead className="border-b bg-muted">
              <tr>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Vuelo</th>
                <th className="p-3 text-left">Estado</th>
                <th className="p-3 text-left">Fecha del vuelo</th>
                <th className="p-3 text-left">Fecha del incidente</th>
                <th className="p-3 text-left">Descripción</th>
              </tr>
            </thead>

            <tbody>
              {incidents.map((incident) => (
                <tr
                  key={incident.id}
                  className="border-b last:border-b-0"
                >
                  <td className="p-3">
                    {incident.id}
                  </td>

                  <td className="p-3 font-medium">
                    {incident.id_vuelo.codigo_vuelo}
                  </td>

                  <td className="p-3">
                    {incident.id_vuelo.estado}
                  </td>

                  <td className="p-3">
                    {new Date(
                      `${incident.id_vuelo.fecha}T00:00:00`,
                    ).toLocaleDateString()}
                  </td>

                  <td className="p-3">
                    {new Date(
                      `${incident.fecha}T00:00:00`,
                    ).toLocaleDateString()}
                  </td>

                  <td className="p-3">
                    {incident.descripcion}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {!isLoading && incidents.length === 0 && (
            <p className="p-6 text-center text-sm text-muted-foreground">
              No hay incidentes registrados.
            </p>
          )}
        </div>
      )}
    </div>
  )
}