import { useEffect } from "react";

import { useTrafficControlStore } from "@/presentation/store/traffic-control.store";

export default function TrafficControlPage() {

  const {

    controls,

    loadControls,

    isLoading,

  } = useTrafficControlStore();

  useEffect(() => {

    loadControls();

  }, []);

  return (

    <div className="space-y-6">

      <div>

        <h1 className="text-2xl font-bold">
          Controles de Tráfico
        </h1>

        <p className="text-muted-foreground">
          Gestión de autorizaciones del control de tráfico aéreo
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
                  Vuelo
                </th>

                <th className="p-3 text-left">
                  Estado
                </th>

                <th className="p-3 text-left">
                  Autorización
                </th>

                <th className="p-3 text-left">
                  Hora
                </th>

                <th className="p-3 text-left">
                  Fecha
                </th>

              </tr>

            </thead>

            <tbody>

              {

                controls.map((control) => (

                  <tr
                    key={control.id}
                    className="border-b"
                  >

                    <td className="p-3">
                      {control.id_vuelo.codigo_vuelo}
                    </td>

                    <td className="p-3">
                      {control.id_vuelo.estado}
                    </td>

                    <td className="p-3">
                      {control.autorizacion}
                    </td>

                    <td className="p-3">
                      {new Date(control.hora).toLocaleTimeString()}
                    </td>

                    <td className="p-3">
                      {new Date(control.id_vuelo.fecha).toLocaleDateString()}
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