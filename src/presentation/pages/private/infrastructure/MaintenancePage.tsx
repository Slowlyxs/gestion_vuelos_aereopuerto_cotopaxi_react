import { useEffect } from 'react'

import { useMaintenanceStore } from '@/presentation/store/maintenance.store'

export default function MaintenancePage() {
  const {
    maintenances,
    loadMaintenances,
    isLoading,
    error,
  } = useMaintenanceStore()

  useEffect(() => {
    loadMaintenances()
  }, [loadMaintenances])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          Mantenimientos
        </h1>

        <p className="text-muted-foreground">
          Gestión de mantenimientos de aeronaves
        </p>
      </div>

      {error && (
        <div className="rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {isLoading ? (
        <p>Cargando mantenimientos...</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full">
            <thead className="border-b bg-muted">
              <tr>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Avión</th>
                <th className="p-3 text-left">Fecha</th>
                <th className="p-3 text-left">Estado</th>
              </tr>
            </thead>

            <tbody>
              {maintenances.map((maintenance) => (
                <tr
                  key={maintenance.id_mantenimiento}
                  className="border-b last:border-b-0"
                >
                  <td className="p-3">
                    {maintenance.id_mantenimiento}
                  </td>

                  <td className="p-3">
                    <div className="space-y-1">

                      <p className="font-semibold">
                        {maintenance.id_avion.modelo}
                      </p>

                      <p className="text-sm text-muted-foreground">
                        Matrícula: {maintenance.id_avion.matricula}
                      </p>

                      <p className="text-sm text-muted-foreground">
                        Capacidad: {maintenance.id_avion.capacidad} pasajeros
                      </p>

                      <p className="text-sm">
                        Aerolínea: {maintenance.id_avion.aerolinea.nombre}
                      </p>

                    </div>
                  </td>

                  <td className="p-3">
                    {new Date(
                      `${maintenance.fecha}T00:00:00`,
                    ).toLocaleDateString()}
                  </td>

                  <td className="p-3">
                    {maintenance.estado}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {maintenances.length === 0 && (
            <p className="p-6 text-center text-sm text-muted-foreground">
              No hay mantenimientos registrados.
            </p>
          )}
        </div>
      )}
    </div>
  )
}