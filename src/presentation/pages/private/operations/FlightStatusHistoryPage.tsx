import { useEffect } from "react";

import { useFlightStatusHistoryStore } from "@/presentation/store/flight-status-history.store";

export default function FlightStatusHistoryPage() {

  const {

    history,

    loadHistory,

    isLoading,

  } = useFlightStatusHistoryStore();

  useEffect(() => {

    loadHistory();

  }, []);

  return (

    <div className="space-y-6">

      <div>

        <h1 className="text-2xl font-bold">

          Historial de Estados de Vuelo

        </h1>

        <p className="text-muted-foreground">

          Registro histórico de cambios de estado de los vuelos

        </p>

      </div>

      {

        isLoading ?

        <p>Cargando...</p>

        :

        <div className="rounded-lg border overflow-hidden">

          <table className="w-full">

            <thead className="border-b bg-muted">

              <tr>

                <th className="p-3 text-left">

                  ID

                </th>

                <th className="p-3 text-left">

                  Vuelo

                </th>

                <th className="p-3 text-left">

                  Estado

                </th>

                <th className="p-3 text-left">

                  Observación

                </th>

                <th className="p-3 text-left">

                  Fecha

                </th>

              </tr>

            </thead>

            <tbody>

              {

                history.map((item) => (

                  <tr
                    key={item.id}
                    className="border-b"
                  >

                    <td className="p-3">

                      {item.id}

                    </td>

                    <td className="p-3">

                      {item.id_vuelo}

                    </td>

                    <td className="p-3">

                      {item.id_estado.nombre_estado}

                    </td>

                    <td className="p-3">

                      {item.observacion}

                    </td>

                    <td className="p-3">

                      {new Date(item.fecha_cambio).toLocaleString()}

                    </td>

                  </tr>

                ))

              }

            </tbody>

          </table>

        </div>

      }

    </div>

  );

}