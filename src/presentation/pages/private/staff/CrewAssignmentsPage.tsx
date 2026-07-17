import { useEffect } from 'react'

import { useCrewAssignmentStore } from '@/presentation/store/crew-assignment.store'

export default function CrewAssignmentsPage() {
  const {
    crewAssignments,
    loadCrewAssignments,
    isLoading,
    error,
  } = useCrewAssignmentStore()

  useEffect(() => {
    loadCrewAssignments()
  }, [loadCrewAssignments])

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-2xl font-bold">
          Asignaciones de tripulación
        </h1>

        <p className="text-muted-foreground">
          Gestión de asignaciones
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
                <th className="p-3 text-left">Empleado</th>
              </tr>
            </thead>

            <tbody>

              {crewAssignments.map((assignment) => (

                <tr
                  key={assignment.id_asignacion}
                  className="border-b last:border-b-0"
                >

                  <td className="p-3">
                    {assignment.id_asignacion}
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
                        {assignment.id_empleado.nombre}
                      </p>

                      <p className="text-sm text-muted-foreground">
                        Cargo: {assignment.id_empleado.cargo}
                      </p>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

          {crewAssignments.length === 0 && (
            <p className="p-6 text-center text-sm text-muted-foreground">
              No hay asignaciones registradas.
            </p>
          )}

        </div>
      )}
    </div>
  )
}