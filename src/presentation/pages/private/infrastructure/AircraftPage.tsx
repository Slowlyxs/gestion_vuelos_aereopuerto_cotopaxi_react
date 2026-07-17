import { useEffect } from "react";

import { useAircraftStore } from "@/presentation/store/aircraft.store";

export default function AircraftPage() {

  const {

    aircraft,

    loadAircraft,

    isLoading,

  } = useAircraftStore();

  useEffect(() => {

    loadAircraft();

  }, []);

  return (

    <div className="space-y-6">

      <div>

        <h1 className="text-2xl font-bold">
          Aviones
        </h1>

        <p className="text-muted-foreground">
          Gestión de aviones registrados
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
                  Modelo
                </th>

                <th className="p-3 text-left">
                  Matrícula
                </th>

                <th className="p-3 text-left">
                  Capacidad
                </th>

                <th className="p-3 text-left">
                  Aerolínea
                </th>

              </tr>

            </thead>

            <tbody>

              {

                aircraft.map((item) => (

                  <tr
                    key={item.id_avion}
                    className="border-b"
                  >

                    <td className="p-3">
                      {item.modelo}
                    </td>

                    <td className="p-3">
                      {item.matricula}
                    </td>

                    <td className="p-3">
                      {item.capacidad}
                    </td>

                    <td className="p-3">
                      <td className="p-3">
                        <div>
                          <p className="font-medium">
                            {item.id_aerolinea.nombre}
                          </p>

                          <p className="text-sm text-muted-foreground">
                            {item.id_aerolinea.pais}
                          </p>
                        </div>
                      </td>
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