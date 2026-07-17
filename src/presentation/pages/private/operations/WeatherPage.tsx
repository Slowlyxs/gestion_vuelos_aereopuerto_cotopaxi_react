import { useEffect } from "react";

import { useWeatherStore } from "@/presentation/store/weather.store";

export default function WeatherPage() {

  const {

    weather,

    loadWeather,

    isLoading,

  } = useWeatherStore();

  useEffect(() => {

    loadWeather();

  }, []);

  return (

    <div className="space-y-6">

      <div>

        <h1 className="text-2xl font-bold">
          Clima
        </h1>

        <p className="text-muted-foreground">
          Información climática registrada
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
                  Fecha
                </th>

                <th className="p-3 text-left">
                  Temperatura
                </th>

                <th className="p-3 text-left">
                  Condición
                </th>

                <th className="p-3 text-left">
                  Velocidad viento
                </th>

                <th className="p-3 text-left">
                  Aeropuerto
                </th>

              </tr>

            </thead>

            <tbody>

              {

                weather.map((item) => (

                  <tr
                    key={item.id_clima}
                    className="border-b"
                  >

                    <td className="p-3">
                      {new Date(item.fecha).toLocaleDateString()}
                    </td>

                    <td className="p-3">
                      {item.temperatura} °C
                    </td>

                    <td className="p-3">
                      {item.condicion}
                    </td>

                    <td className="p-3">
                      {item.velocidad_viento} km/h
                    </td>

                    <td className="p-3">
                      <div>
                        <p className="font-medium">
                          {item.id_aeropuerto.nombre}
                        </p>

                        <p className="text-sm text-muted-foreground">
                          {item.id_aeropuerto.ciudad}, {item.id_aeropuerto.pais}
                        </p>

                        <p className="text-sm">
                          Código: {item.id_aeropuerto.codigo_iata}
                        </p>
                      </div>
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