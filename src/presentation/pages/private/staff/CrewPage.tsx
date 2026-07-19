import { useEffect } from 'react'

import { useCrewStore } from '@/presentation/store/crew-store'

export default function CrewPage() {
  const {
    crews,
    loadCrews,
    isLoading,
    error,
  } = useCrewStore()

  useEffect(() => {
    loadCrews()
  }, [loadCrews])

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-2xl font-bold">
          Tripulación
        </h1>

        <p className="text-muted-foreground">
          Gestión de la tripulación
        </p>
      </div>

      {error && (
        <div className="rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {isLoading ? (
        <p>Cargando tripulación...</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border">

          <table className="w-full">

            <thead className="border-b bg-muted">
              <tr>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Cargo</th>
                <th className="p-3 text-left">Empleado</th>
              </tr>
            </thead>

            <tbody>

              {crews.map((crew) => (

                <tr
                  key={crew.id}
                  className="border-b last:border-b-0"
                >

                  <td className="p-3">
                    {crew.id}
                  </td>

                  <td className="p-3">
                    {crew.cargo}
                  </td>

                  <td className="p-3">

                    <div className="space-y-1">

                      <p className="font-semibold">
                        {crew.id_empleado.nombre}
                      </p>

                      <p className="text-sm text-muted-foreground">
                        Cargo: {crew.id_empleado.cargo}
                      </p>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

          {crews.length === 0 && (
            <p className="p-6 text-center text-sm text-muted-foreground">
              No hay tripulaciones registradas.
            </p>
          )}

        </div>
      )}
    </div>
  )
}