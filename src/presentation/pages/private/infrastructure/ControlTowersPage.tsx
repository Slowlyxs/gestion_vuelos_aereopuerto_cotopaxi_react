import { useEffect } from 'react'

import { useControlTowerStore } from '@/presentation/store/control-tower.store'

export default function ControlTowersPage() {
  const {
    controlTowers,
    loadControlTowers,
    isLoading,
    error,
  } = useControlTowerStore()

  useEffect(() => {
    loadControlTowers()
  }, [loadControlTowers])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          Torres de control
        </h1>

        <p className="text-muted-foreground">
          Gestión de torres de control aeroportuario
        </p>
      </div>

      {error && (
        <div className="rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {isLoading ? (
        <p>Cargando torres de control...</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full">
            <thead className="border-b bg-muted">
              <tr>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Nombre</th>
                <th className="p-3 text-left">Frecuencia</th>
                <th className="p-3 text-left">Aeropuerto</th>
              </tr>
            </thead>

            <tbody>
              {controlTowers.map((tower) => (
                <tr
                  key={tower.id_torre}
                  className="border-b last:border-b-0"
                >
                  <td className="p-3">
                    {tower.id_torre}
                  </td>

                  <td className="p-3 font-medium">
                    {tower.nombre}
                  </td>

                  <td className="p-3">
                    {tower.frecuencia}
                  </td>

                  <td className="p-3">
                    Aeropuerto #{tower.id_aeropuerto}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {controlTowers.length === 0 && (
            <p className="p-6 text-center text-sm text-muted-foreground">
              No hay torres de control registradas.
            </p>
          )}
        </div>
      )}
    </div>
  )
}