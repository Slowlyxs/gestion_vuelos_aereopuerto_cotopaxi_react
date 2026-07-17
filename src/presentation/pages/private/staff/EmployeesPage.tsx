import { useEffect } from "react";

import { useEmployeeStore } from "@/presentation/store/employee.store";

export default function EmployeesPage() {

  const {

    employees,

    loadEmployees,

    isLoading,

  } = useEmployeeStore();

  useEffect(() => {

    loadEmployees();

  }, []);

  return (

    <div className="space-y-6">

      <div>

        <h1 className="text-2xl font-bold">
          Empleados
        </h1>

        <p className="text-muted-foreground">
          Gestión del personal del aeropuerto
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
                  Nombre
                </th>

                <th className="p-3 text-left">
                  Cargo
                </th>

                <th className="p-3 text-left">
                  Imagen
                </th>

              </tr>

            </thead>

            <tbody>

              {

                employees.map((employee) => (

                  <tr
                    key={employee.id}
                    className="border-b"
                  >

                    <td className="p-3">
                      {employee.id}
                    </td>

                    <td className="p-3">
                      {employee.nombre}
                    </td>

                    <td className="p-3">
                      {employee.cargo}
                    </td>

                    <td className="p-3">

                      {

                        employee.image_url ?

                        <img
                          src={employee.image_url}
                          alt={employee.nombre}
                          className="h-12 w-12 rounded object-cover"
                        />

                        :

                        <span className="text-muted-foreground">
                          Sin imagen
                        </span>

                      }

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