import { useEffect } from "react";

import { useAirportStore } 
from "@/presentation/store/airport.store";


export default function AirportsPage() {


  const {
    airports,
    loadAirports,
    isLoading
  } = useAirportStore();



  useEffect(() => {

    loadAirports();

  }, []);



  return (

    <div className="space-y-6">


      <div>

        <h1 className="text-2xl font-bold">
          Aeropuertos
        </h1>

        <p className="text-muted-foreground">
          Administración de aeropuertos registrados
        </p>

      </div>



      {
        isLoading ?

        <p>
          Cargando aeropuertos...
        </p>

        :


        <div className="rounded-lg border">


          <table className="w-full">


            <thead className="border-b">

              <tr>

                <th className="p-3 text-left">
                  Nombre
                </th>


                <th className="p-3 text-left">
                  Código IATA
                </th>


                <th className="p-3 text-left">
                  Ciudad
                </th>


                <th className="p-3 text-left">
                  País
                </th>


              </tr>

            </thead>



            <tbody>


              {
                airports.map((airport)=>(


                  <tr
                    key={airport.id_aeropuerto}
                    className="border-b"
                  >


                    <td className="p-3">
                      {airport.nombre}
                    </td>



                    <td className="p-3">
                      {airport.codigo_iata}
                    </td>



                    <td className="p-3">
                      {airport.ciudad}
                    </td>



                    <td className="p-3">
                      {airport.pais}
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