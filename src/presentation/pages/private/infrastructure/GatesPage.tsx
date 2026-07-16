import { useEffect } from 'react'

import { useBoardingGateStore } from '@/presentation/store/boarding-gate.store'

export default function GatesPage() {
  const {
    boardingGates,
    loadBoardingGates,
    isLoading,
    error,
  } = useBoardingGateStore()

  useEffect(() => {
    loadBoardingGates()
  }, [loadBoardingGates])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          Puertas de embarque
        </h1>

        <p className="text-muted-foreground">
          Gestión de puertas de embarque y terminales asignadas
        </p>
      </div>

      {error && (
        <div className="rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {isLoading ? (
        <p>Cargando puertas de embarque...</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full">
            <thead className="border-b bg-muted">
              <tr>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Número de puerta</th>
                <th className="p-3 text-left">Terminal</th>
              </tr>
            </thead>

            <tbody>
              {boardingGates.map((gate) => (
                <tr
                  key={gate.id_puerta}
                  className="border-b last:border-b-0"
                >
                  <td className="p-3">
                    {gate.id_puerta}
                  </td>

                  <td className="p-3 font-medium">
                    Puerta {gate.numero}
                  </td>

                  <td className="p-3">
                    Terminal #{gate.id_terminal}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {boardingGates.length === 0 && (
            <p className="p-6 text-center text-sm text-muted-foreground">
              No hay puertas de embarque registradas.
            </p>
          )}
        </div>
      )}
    </div>
  )
}