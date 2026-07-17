import { useEffect } from 'react'

import { useGateStore } from '@/presentation/store/boarding-gate.store'


export default function GatesPage() {

  const {
    gates,
    loadGates,
    isLoading,
    error,
  } = useGateStore()


  useEffect(() => {

    loadGates()

  }, [loadGates])


  return (

    <div className="space-y-6">

      <div>

        <h1 className="text-2xl font-bold">
          Puertas de embarque
        </h1>

        <p className="text-muted-foreground">
          Gestión de puertas de embarque
        </p>

      </div>


      {error && (

        <div className="rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>

      )}



      {isLoading ? (

        <p>
          Cargando puertas...
        </p>


      ) : (

        <div className="overflow-x-auto rounded-lg border">

          <table className="w-full">

            <thead className="border-b bg-muted">

              <tr>

                <th className="p-3 text-left">
                  ID
                </th>

                <th className="p-3 text-left">
                  Puerta
                </th>

                <th className="p-3 text-left">
                  Terminal
                </th>

              </tr>

            </thead>


            <tbody>

              {gates.map((gate) => (

                <tr
                  key={gate.id_puerta}
                  className="border-b last:border-b-0"
                >

                  <td className="p-3">
                    {gate.id_puerta}
                  </td>


                  <td className="p-3">
                    Puerta {gate.numero}
                  </td>


                  <td className="p-3">

                    <div className="space-y-1">

                      <p className="font-semibold">
                        Terminal {gate.id_terminal.numero}
                      </p>


                      <p className="text-sm text-muted-foreground">
                        {gate.id_terminal.aeropuerto.nombre}
                      </p>


                      <p className="text-sm text-muted-foreground">
                        {gate.id_terminal.aeropuerto.ciudad}, {gate.id_terminal.aeropuerto.pais}
                      </p>


                      <p className="text-sm">
                        IATA: {gate.id_terminal.aeropuerto.codigo_iata}
                      </p>


                    </div>

                  </td>


                </tr>

              ))}

            </tbody>

          </table>


          {gates.length === 0 && (

            <p className="p-6 text-center text-sm text-muted-foreground">
              No hay puertas de embarque registradas.
            </p>

          )}

        </div>

      )}

    </div>

  )

}