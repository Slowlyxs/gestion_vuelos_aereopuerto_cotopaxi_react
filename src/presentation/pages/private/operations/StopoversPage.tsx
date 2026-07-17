import { useEffect } from "react";

import { useStopoverStore } from "@/presentation/store/stopover.store";

export default function StopoversPage() {

  const {

    stopovers,

    loadStopovers,

    isLoading,

  } = useStopoverStore();

  useEffect(() => {

    loadStopovers();

  }, []);

  return (

    <div className="space-y-6">

      <div>

        <h1 className="text-2xl font-bold">
          Escalas
        </h1>

        <p className="text-muted-foreground">
          Gestión de escalas de los vuelos
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
                  Aeropuerto
                </th>

                <th className="p-3 text-left">
                  Ciudad
                </th>

                <th className="p-3 text-left">
                  País
                </th>

                <th className="p-3 text-left">
                  Código IATA
                </th>

              </tr>

            </thead>

            <tbody>

              {

                stopovers.map((stopover) => (

                  <tr
                    key={stopover.id}
                    className="border-b"
                  >

                    <td className="p-3">
                      {stopover.id}
                    </td>

                    <td className="p-3">
                      {stopover.id_vuelo}
                    </td>

                    <td className="p-3">
                      {stopover.aeropuerto_escala.nombre}
                    </td>

                    <td className="p-3">
                      {stopover.aeropuerto_escala.ciudad}
                    </td>

                    <td className="p-3">
                      {stopover.aeropuerto_escala.pais}
                    </td>

                    <td className="p-3">
                      {stopover.aeropuerto_escala.codigo_iata}
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