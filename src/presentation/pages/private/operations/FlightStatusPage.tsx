import { useEffect } from "react";

import { useFlightStatusStore } from "@/presentation/store/flight-status.store";

export default function FlightStatusPage() {

  const {

    flightStatus,

    loadFlightStatus,

    isLoading,

  } = useFlightStatusStore();

  useEffect(() => {

    loadFlightStatus();

  }, []);

  return (

    <div className="space-y-6">

      <div>

        <h1 className="text-2xl font-bold">
          Estados de vuelo
        </h1>

        <p className="text-muted-foreground">
          Gestión de estados de vuelo
        </p>

      </div>

      {

        isLoading ?

        <p>Cargando...</p>

        :

        <div className="rounded-lg border">

          <table className="w-full">

            <thead className="border-b">

              <tr>

                <th className="p-3 text-left">
                  ID
                </th>

                <th className="p-3 text-left">
                  Estado
                </th>

                <th className="p-3 text-left">
                  Descripción
                </th>

              </tr>

            </thead>

            <tbody>

              {

                flightStatus.map((status) => (

                  <tr
                    key={status.id_estado}
                    className="border-b"
                  >

                    <td className="p-3">
                      {status.id_estado}
                    </td>

                    <td className="p-3">
                      {status.nombre_estado}
                    </td>

                    <td className="p-3">
                      {status.descripcion ?? "-"}
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