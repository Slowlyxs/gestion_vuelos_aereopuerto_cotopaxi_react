import { useEffect } from "react";

import { useAircraftTypeStore } from "@/presentation/store/aircraft-type.store";

export default function AircraftTypesPage() {

  const {

    aircraftTypes,

    loadAircraftTypes,

    isLoading,

    error,

  } = useAircraftTypeStore();

  useEffect(() => {

    loadAircraftTypes();

  }, []);

  return (

    <div className="space-y-6">

      <div>

        <h1 className="text-2xl font-bold">

          Tipos de avión

        </h1>

        <p className="text-muted-foreground">

          Gestión de fabricantes y modelos de aeronaves

        </p>

      </div>

      {

        error &&

        <div className="rounded-md bg-destructive/10 p-3 text-destructive">

          {error}

        </div>

      }

      {

        isLoading ?

        <p>Cargando tipos de avión...</p>

        :

        <div className="overflow-x-auto rounded-lg border">

          <table className="w-full">

            <thead className="border-b bg-muted">

              <tr>

                <th className="p-3 text-left">

                  ID

                </th>

                <th className="p-3 text-left">

                  Fabricante

                </th>

                <th className="p-3 text-left">

                  Modelo

                </th>

                <th className="p-3 text-left">

                  Alcance

                </th>

                <th className="p-3 text-left">

                  Imagen

                </th>

              </tr>

            </thead>

            <tbody>

              {

                aircraftTypes.map((type) => (

                  <tr
                    key={type.id_tipo}
                    className="border-b"
                  >

                    <td className="p-3">

                      {type.id_tipo}

                    </td>

                    <td className="p-3">

                      {type.fabricante}

                    </td>

                    <td className="p-3">

                      {type.modelo}

                    </td>

                    <td className="p-3">

                      {type.alcance}

                    </td>

                    <td className="p-3">

                      {

                        type.image_url ?

                        <img
                          src={type.image_url}
                          alt={type.modelo}
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