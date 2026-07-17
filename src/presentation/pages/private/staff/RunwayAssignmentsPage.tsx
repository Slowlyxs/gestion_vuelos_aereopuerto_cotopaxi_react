import { useEffect } from "react";

import { useRunwayAssignmentStore } from "@/presentation/store/runway-assignment.store";

export default function RunwayAssignmentsPage() {

  const {

    assignments,

    loadAssignments,

    isLoading,

  } = useRunwayAssignmentStore();

  useEffect(() => {

    loadAssignments();

  }, []);

  return (

    <div className="space-y-6">

      <div>

        <h1 className="text-2xl font-bold">
          Asignaciones de pista
        </h1>

        <p className="text-muted-foreground">
          Gestión de asignaciones de pista
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
                    Pista
                  </th>

                </tr>

              </thead>

              <tbody>

                {

                  assignments.map((assignment) => (

                    <tr
                      key={assignment.id_asignacion_pista}
                      className="border-b"
                    >

                      <td className="p-3">
                        {assignment.id_asignacion_pista}
                      </td>

                      <td className="p-3">
                        {assignment.id_vuelo}
                      </td>

                      <td className="p-3">
                        {assignment.id_pista}
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