import { useEffect, useState } from "react";

import { useAirportStore } 
from "@/presentation/store/airport.store";


export default function AirportsPage() {


  const {
    airports,
    loadAirports,
    isLoading
  } = useAirportStore();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);


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
                  Imagen
                </th>

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
                      {airport.image_url ? (
                        <img
                          src={airport.image_url}
                          alt={airport.nombre}
                          onClick={() => setSelectedImage(airport.image_url)}
                          className="h-16 w-16 rounded object-cover cursor-pointer hover:opacity-80 transition-opacity"
                        />
                      ) : (
                        <span className="text-muted-foreground text-xs">
                          Sin imagen
                        </span>
                      )}
                    </td>

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

      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
        >
          <div className="relative max-h-[90vh] max-w-3xl" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-10 right-0 text-white text-3xl leading-none hover:text-gray-300"
              aria-label="Cerrar"
            >
              ×
            </button>
            <img
              src={selectedImage}
              alt="Vista ampliada"
              className="max-h-[90vh] max-w-full rounded-lg object-contain"
            />
          </div>
        </div>
      )}


    </div>

  );

}