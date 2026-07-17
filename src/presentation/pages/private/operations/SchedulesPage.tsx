import { useEffect } from "react";

import { useScheduleStore } from "@/presentation/store/schedule.store";

export default function SchedulesPage() {

  const {

    schedules,

    loadSchedules,

    isLoading,

  } = useScheduleStore();

  useEffect(() => {

    loadSchedules();

  }, []);

  return (

    <div className="space-y-6">

      <div>

        <h1 className="text-2xl font-bold">
          Horarios
        </h1>

        <p className="text-muted-foreground">
          Horarios programados de los vuelos
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
                  Fecha
                </th>

                <th className="p-3 text-left">
                  Estado
                </th>

                <th className="p-3 text-left">
                  Salida
                </th>

                <th className="p-3 text-left">
                  Llegada
                </th>

              </tr>

            </thead>

            <tbody>

              {

                schedules.map((schedule) => (

                  <tr
                    key={schedule.id}
                    className="border-b"
                  >

                    <td className="p-3">

                      {schedule.id_vuelo.codigo_vuelo}

                    </td>

                    <td className="p-3">

                      {new Date(schedule.id_vuelo.fecha).toLocaleDateString()}

                    </td>

                    <td className="p-3">

                      {schedule.id_vuelo.estado}

                    </td>

                    <td className="p-3">

                      {new Date(schedule.salida_programada).toLocaleString()}

                    </td>

                    <td className="p-3">

                      {new Date(schedule.llegada_programada).toLocaleString()}

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