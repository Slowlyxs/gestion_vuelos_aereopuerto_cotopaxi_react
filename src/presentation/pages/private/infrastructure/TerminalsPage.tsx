import { useEffect } from 'react'

import { useTerminalStore } from '@/presentation/store/terminal.store'

export default function TerminalsPage() {
  const {
    terminals,
    loadTerminals,
    isLoading,
    error,
  } = useTerminalStore()

  useEffect(() => {
    loadTerminals()
  }, [loadTerminals])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          Terminales
        </h1>

        <p className="text-muted-foreground">
          Gestión de terminales de los aeropuertos
        </p>
      </div>

      {error && (
        <div className="rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {isLoading ? (
        <p>Cargando terminales...</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full">
            <thead className="border-b bg-muted">
              <tr>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Número</th>
                <th className="p-3 text-left">Aeropuerto</th>
              </tr>
            </thead>

            <tbody>
              {terminals.map((terminal) => (
                <tr
                  key={terminal.id_terminal}
                  className="border-b last:border-b-0"
                >
                  <td className="p-3">
                    {terminal.id_terminal}
                  </td>

                  <td className="p-3 font-medium">
                    Terminal {terminal.numero}
                  </td>

                  <td className="p-3">
                    Aeropuerto #{terminal.id_aeropuerto}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {terminals.length === 0 && (
            <p className="p-6 text-center text-sm text-muted-foreground">
              No hay terminales registradas.
            </p>
          )}
        </div>
      )}
    </div>
  )
}