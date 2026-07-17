import { useEffect } from "react";

import { useCrewAssignmentStore } from "@/presentation/store/crew-assignment.store";

export default function CrewAssignmentsPage() {

  const {

    assignments,

    loadAssignments,

    isLoading,

  } = useCrewAssignmentStore();

  useEffect(() => {

    loadAssignments();

  }, []);

  return (

    <div className="space-y-6">

      <div>

        <h1 className="text-2xl font-bold">
          Asignaciones de Tripulación
        </h1>

        <p className="text-muted-foreground">
          Gestión de asignaciones de tripulación
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
                  Vuelo
                </th>

                <th className="p-3 text-left">
                  Empleado
                </th>

              </tr>

            </thead>

            <tbody>

              {

                assignments.map((assignment) => (

                  <tr
                    key={assignment.id_asignacion}
                    className="border-b"
                  >

                    <td className="p-3">
                      {assignment.id_asignacion}
                    </td>

                    <td className="p-3">
                      {assignment.id_vuelo}
                    </td>

                    <td className="p-3">
                      {assignment.id_empleado}
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