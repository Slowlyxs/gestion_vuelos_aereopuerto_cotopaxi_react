import { useEffect } from "react";

import { useFlightAuthorizationStore } from "@/presentation/store/flight-authorization.store";

export default function FlightAuthorizationsPage() {

  const {

    authorizations,

    loadAuthorizations,

    isLoading,

  } = useFlightAuthorizationStore();

  useEffect(() => {

    loadAuthorizations();

  }, []);

  return (

    <div className="space-y-6">

      <div>

        <h1 className="text-2xl font-bold">
          Autorizaciones de vuelo
        </h1>

        <p className="text-muted-foreground">
          Gestión de autorizaciones de vuelo
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
                  Tipo
                </th>

                <th className="p-3 text-left">
                  Fecha
                </th>

                <th className="p-3 text-left">
                  Estado
                </th>

                <th className="p-3 text-left">
                  Vuelo
                </th>

              </tr>

            </thead>

            <tbody>

              {

                authorizations.map((authorization) => (

                  <tr
                    key={authorization.id_autorizacion}
                    className="border-b"
                  >

                    <td className="p-3">
                      {authorization.id_autorizacion}
                    </td>

                    <td className="p-3">
                      {authorization.tipo_autorizacion}
                    </td>

                    <td className="p-3">
                      {new Date(authorization.fecha).toLocaleDateString()}
                    </td>

                    <td className="p-3">
                      {authorization.estado}
                    </td>

                    <td className="p-3">
                      {authorization.id_vuelo}
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