import { useEffect } from 'react'

import { usePilotStore } from '@/presentation/store/pilot.store'

export default function PilotsPage() {
  const {
    pilots,
    loadPilots,
    isLoading,
    error,
  } = usePilotStore()

  useEffect(() => {
    loadPilots()
  }, [loadPilots])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          Pilotos
        </h1>

        <p className="text-muted-foreground">
          Gestión de pilotos registrados
        </p>
      </div>

      {error && (
        <div className="rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {isLoading ? (
        <p>Cargando pilotos...</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full">
            <thead className="border-b bg-muted">
              <tr>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Nombre</th>
                <th className="p-3 text-left">Cargo</th>
                <th className="p-3 text-left">Licencia</th>
                <th className="p-3 text-left">Imagen</th>
              </tr>
            </thead>

            <tbody>
              {pilots.map((pilot) => (
                <tr
                  key={pilot.id}
                  className="border-b last:border-b-0"
                >
                  <td className="p-3">
                    {pilot.id}
                  </td>

                  <td className="p-3 font-medium">
                    {pilot.id_empleado.nombre}
                  </td>

                  <td className="p-3">
                    {pilot.id_empleado.cargo}
                  </td>

                  <td className="p-3">
                    {pilot.licencia}
                  </td>

                  <td className="p-3">
                    {pilot.image_url ? (
                      <img
                        src={pilot.image_url}
                        alt={pilot.id_empleado.nombre}
                        className="h-12 w-12 rounded object-cover"
                      />
                    ) : (
                      <span className="text-muted-foreground">
                        Sin imagen
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {pilots.length === 0 && (
            <p className="p-6 text-center text-sm text-muted-foreground">
              No hay pilotos registrados.
            </p>
          )}
        </div>
      )}
    </div>
  )
}