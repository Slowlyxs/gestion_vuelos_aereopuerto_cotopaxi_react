// src/presentation/pages/private/dashboard/DashboardPage.tsx

import { useEffect } from "react";

import { useAirportStore }
    from "@/presentation/store/airport.store";


export default function DashboardPage() {


    const {
        airports,
        loadAirports
    } = useAirportStore();



    useEffect(() => {

        loadAirports();

    }, []);



    return (

        <div className="space-y-6">

            <h1 className="text-2xl font-bold">
                Dashboard
            </h1>


            <div className="grid gap-4 md:grid-cols-3">


                <div className="rounded-lg border p-5">

                    <p className="text-sm text-muted-foreground">
                        Aeropuertos registrados
                    </p>


                    <p className="text-3xl font-bold">
                        {airports.length}
                    </p>

                </div>



            </div>


        </div>

    );

}