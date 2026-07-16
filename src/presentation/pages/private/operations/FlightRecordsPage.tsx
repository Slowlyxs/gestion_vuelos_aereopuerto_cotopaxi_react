import { useEffect } from 'react'

import { useFlightRecordStore } from '@/presentation/store/flight-record.store'

export default function FlightRecordsPage() {
  const {
    flightRecords,
    loadFlightRecords,
    isLoading,
    error,
  } = useFlightRecordStore()

  useEffect(() => {
    loadFlightRecords()
  }, [loadFlightRecords])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          Registros de vuelo
        </h1>

        <p className="text-muted-foreground">
          Registro de horas reales de salida y llegada
        </p>
      </div>

      {error && (
        <div className="rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {isLoading ? (
        <p>Cargando registros de vuelo...</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full">
            <thead className="border-b bg-muted">
              <tr>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Vuelo</th>
                <th className="p-3 text-left">Fecha</th>
                <th className="p-3 text-left">Estado</th>
                <th className="p-3 text-left">Salida real</th>
                <th className="p-3 text-left">Llegada real</th>
              </tr>
            </thead>

            <tbody>
              {flightRecords.map((record) => (
                <tr
                  key={record.id}
                  className="border-b last:border-b-0"
                >
                  <td className="p-3">
                    {record.id}
                  </td>

                  <td className="p-3 font-medium">
                    {record.id_vuelo.codigo_vuelo}
                  </td>

                  <td className="p-3">
                    {new Date(
                      `${record.id_vuelo.fecha}T00:00:00`,
                    ).toLocaleDateString()}
                  </td>

                  <td className="p-3">
                    {record.id_vuelo.estado}
                  </td>

                  <td className="p-3">
                    {new Date(record.hora_real_salida).toLocaleString()}
                  </td>

                  <td className="p-3">
                    {new Date(record.hora_real_llegada).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {flightRecords.length === 0 && (
            <p className="p-6 text-center text-sm text-muted-foreground">
              No hay registros de vuelo.
            </p>
          )}
        </div>
      )}
    </div>
  )
}