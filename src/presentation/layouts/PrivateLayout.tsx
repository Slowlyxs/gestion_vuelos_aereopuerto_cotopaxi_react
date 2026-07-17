// src/presentation/layouts/PrivateLayout.tsx

import { Outlet, Link, useNavigate } from "react-router-dom";

import { useAuthStore } from "@/presentation/store/auth.store";


export default function PrivateLayout() {


  const navigate = useNavigate();


  const logout = useAuthStore(
    (state) => state.logout
  );



  async function handleLogout() {

    await logout();


    navigate(
      "/login",
      {
        replace: true,
      }
    );

  }



  return (

    <div className="flex min-h-screen bg-background">


      {/* Sidebar */}

      <aside className="hidden w-64 border-r bg-card p-5 md:block">


        <h2 className="mb-8 text-xl font-bold">
          Cotopaxi Airlines
        </h2>



        <nav className="space-y-2">



          <SidebarItem
            to="/private/dashboard"
            label="Dashboard"
          />



          <p className="mt-6 text-xs font-semibold text-muted-foreground">
            INFRAESTRUCTURA
          </p>


          <SidebarItem
            to="/private/infraestructura/aeropuertos"
            label="Aeropuertos"
          />
          <SidebarItem
            to="/private/infraestructura/aerolineas"
            label="Aerolíneas"
          />


          <SidebarItem
            to="/private/infraestructura/aviones"
            label="Aviones"
          />


          <SidebarItem
            to="/private/infraestructura/mantenimientos"
            label="Mantenimientos"
          />


          <SidebarItem
            to="/private/infraestructura/terminales"
            label="Terminales"
          />


          <SidebarItem
            to="/private/infraestructura/puertas-embarque"
            label="Puertas embarque"
          />




          <p className="mt-6 text-xs font-semibold text-muted-foreground">
            OPERACIONES
          </p>


          <SidebarItem
            to="/private/operaciones/vuelos"
            label="Vuelos"
          />

          <SidebarItem
            to="/private/operaciones/rutas"
            label="Rutas"
          />
          <SidebarItem
            to="/operaciones/escalas"
            label="Escalas"
          />
          <SidebarItem
            to="/operaciones/clima"
            label="Clima"
          />


          <SidebarItem
            to="/private/operaciones/horarios"
            label="Horarios programados"
          />



          <SidebarItem
            to="/private/operaciones/incidentes"
            label="Incidentes"
          />
          <SidebarItem
            to="/operaciones/estado-vuelo"
            label="Estado de vuelo"
          />
          <SidebarItem
            to="/operaciones/autorizaciones-vuelo"
            label="Autorizaciones de vuelo"
          />


          <SidebarItem
            to="/private/operaciones/control-trafico"
            label="Control tráfico"
          />
          <SidebarItem
            to="/operaciones/historial-estados-vuelo"
            label="Historial estado de vuelos"
          />




          <p className="mt-6 text-xs font-semibold text-muted-foreground">
            PERSONAL
          </p>


          <SidebarItem
            to="/private/personal/empleados"
            label="Empleados"
          />


          <SidebarItem
            to="/private/personal/pilotos"
            label="Pilotos"
          />
          <SidebarItem
            to="/private/personal/asignacion-tripulacion"
            label="Asignación de tripulación"
          />


          <SidebarItem
            to="/private/personal/tripulaciones"
            label="Tripulación"
          />

          <SidebarItem
            to="/private/personal/asignacion-pista"
            label="Asignación de pista"
          />


          <SidebarItem
            to="/private/personal/pistas"
            label="Pistas"
          />



        </nav>


      </aside>





      {/* Área principal */}

      <div className="flex flex-1 flex-col">



        {/* Topbar */}

        <header className="flex h-16 items-center justify-between border-b px-6">


          <h1 className="font-semibold">
            Panel administrativo
          </h1>



          <button

            onClick={handleLogout}

            className="
              rounded-md
              border
              px-4
              py-2
              text-sm
              hover:bg-muted
            "

          >

            Cerrar sesión

          </button>



        </header>





        {/* Pages */}

        <main className="flex-1 p-6">

          <Outlet />

        </main>



      </div>



    </div>

  );

}





interface SidebarItemProps {

  to: string;

  label: string;

}



function SidebarItem({
  to,
  label,
}: SidebarItemProps) {


  return (

    <Link

      to={to}

      className="
        block
        rounded-md
        px-3
        py-2
        text-sm
        hover:bg-muted
      "

    >

      {label}

    </Link>

  );

}