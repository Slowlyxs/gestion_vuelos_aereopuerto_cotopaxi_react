import { create } from "zustand";

import type { Airport } 
from "@/domain/entities/airport.entity";


import { getAirportsUseCase } 
from "@/application/use-cases/get-airports.usecase";



interface AirportState {

  airports: Airport[];

  isLoading:boolean;

  error:string | null;


  loadAirports():Promise<void>;

}



export const useAirportStore =
create<AirportState>((set)=>({


  airports:[],


  isLoading:false,


  error:null,



  async loadAirports(){


    try {


      set({
        isLoading:true,
        error:null
      });



      const airports =
        await getAirportsUseCase();



      set({

        airports,

        isLoading:false

      });



    }catch(error){


      console.error(error);


      set({

        error:"No se pudieron cargar los aeropuertos",

        isLoading:false

      });


    }


  }


}));