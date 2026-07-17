import { useEffect } from 'react'

import { useRunwayAssignmentStore } from '@/presentation/store/runway-assignment.store'

export default function RunwayAssignmentsPage() {
  const {
    runwayAssignments,
    loadRunwayAssignments,
    isLoading,
    error,
  } = useRunwayAssignmentStore()

  useEffect(() => {
    loadRunwayAssignments()
  }, [loadRunwayAssignments])

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-2xl font-bold">
          Asignaciones de pista
        </h1>

        <p className="text-muted-foreground">
          Gestión de pistas asignadas a vuelos
        </p>
      </div>

      {error && (
        <div className="rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {isLoading ? (
        <p>Cargando asignaciones...</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border">

          <table className="w-full">

            <thead className="border-b bg-muted">
              <tr>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Vuelo</th>
                <th className="p-3 text-left">Pista</th>
              </tr>
            </thead>

            <tbody>

              {runwayAssignments.map((assignment) => (

                <tr
                  key={assignment.id_asignacion_pista}
                  className="border-b last:border-b-0"
                >

                  <td className="p-3">
                    {assignment.id_asignacion_pista}
                  </td>

                  <td className="p-3">

                    <div className="space-y-1">

                      <p className="font-semibold">
                        {assignment.id_vuelo.codigo_vuelo}
                      </p>

                      <p className="text-sm text-muted-foreground">
                        Estado: {assignment.id_vuelo.estado}
                      </p>

                      <p className="text-sm text-muted-foreground">
                        Fecha: {assignment.id_vuelo.fecha}
                      </p>

                    </div>

                  </td>

                  <td className="p-3">

                    <div className="space-y-1">

                      <p className="font-semibold">
                        {assignment.id_pista.codigo}
                      </p>

                      <p className="text-sm text-muted-foreground">
                        Estado: {assignment.id_pista.estado}
                      </p>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

          {runwayAssignments.length === 0 && (
            <p className="p-6 text-center text-sm text-muted-foreground">
              No hay asignaciones registradas.
            </p>
          )}

        </div>
      )}
    </div>
  )
}