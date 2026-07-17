import { useEffect } from "react";

import { useAirlineStore } from "@/presentation/store/airline.store";

export default function AirlinesPage() {

  const {
    airlines,
    loadAirlines,
    isLoading,
  } = useAirlineStore();

  useEffect(() => {

    loadAirlines();

  }, []);

  return (

    <div className="space-y-6">

      <div>

        <h1 className="text-2xl font-bold">
          Aerolíneas
        </h1>

        <p className="text-muted-foreground">
          Gestión de aerolíneas registradas
        </p>

      </div>

      {isLoading ? (

        <p>Cargando...</p>

      ) : (

        <div className="rounded-lg border">

          <table className="w-full">

            <thead className="border-b">

              <tr>

                <th className="p-3 text-left">Nombre</th>

                <th className="p-3 text-left">País</th>

              </tr>

            </thead>

            <tbody>

              {airlines.map((airline) => (

                <tr
                  key={airline.id_aerolinea}
                  className="border-b"
                >

                  <td className="p-3">
                    {airline.nombre}
                  </td>

                  <td className="p-3">
                    {airline.pais}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>

  );

}