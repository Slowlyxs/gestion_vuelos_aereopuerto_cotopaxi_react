// src/presentation/router/AppRouter.tsx

import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";


// Guards
import ProtectedRoute from "./ProtectedRoute";


// Layouts
import PublicLayout from "@/presentation/layouts/PublicLayout";
import PrivateLayout from "@/presentation/layouts/PrivateLayout";


// =====================
// PUBLIC PAGES
// =====================

import HomePage from "@/presentation/pages/public/HomePage";
import FlightsPage from "@/presentation/pages/public/FlightsPage";
import FlightDetailPage from "@/presentation/pages/public/FlightDetailPage";
import AirlinesPage from "@/presentation/pages/public/AirlinesPage";

import LoginPage from "@/presentation/pages/auth/LoginPage";



// =====================
// PRIVATE PAGES
// =====================

// Dashboard
import DashboardPage from "@/presentation/pages/private/dashboard/DashboardPage";


// Infrastructure
import AirportsPage from "@/presentation/pages/private/infrastructure/AirportsPage";
import AircraftPage from "../pages/private/infrastructure/AircraftPage";
import MaintenancePage from "@/presentation/pages/private/infrastructure/MaintenancePage";
import TerminalsPage from "@/presentation/pages/private/infrastructure/TerminalsPage";
import GatesPage from "@/presentation/pages/private/infrastructure/GatesPage";
import FlightAuthorizationsPage from "../pages/private/operations/FlightAuthorizationsPage";
import FlightStatusHistoryPage from "../pages/private/operations/FlightStatusHistoryPage";


// Operations
import FlightsManagementPage from "@/presentation/pages/private/operations/FlightsManagementPage";
import RoutesPage from "@/presentation/pages/private/operations/RoutesPage";
import SchedulesPage from "@/presentation/pages/private/operations/SchedulesPage";
import IncidentsPage from "@/presentation/pages/private/operations/IncidentsPage";
import TrafficControlPage from "@/presentation/pages/private/operations/TrafficControlPage";
import WeatherPage from "../pages/private/operations/WeatherPage";
import FlightStatusPage from "../pages/private/operations/FlightStatusPage";
import StopoversPage from "../pages/private/operations/StopoversPage";




// Staff
import EmployeesPage from "@/presentation/pages/private/staff/EmployeesPage";
import PilotsPage from "@/presentation/pages/private/staff/PilotsPage";
import CrewPage from "@/presentation/pages/private/staff/CrewPage";
import CrewAssignmentsPage from "../pages/private/staff/CrewAssignmentsPage";
import RunwayAssignmentsPage from "@/presentation/pages/private/staff/RunwayAssignmentsPage";






const router = createBrowserRouter([


  // ==================================================
  // PUBLIC ROUTES
  // ==================================================

  {
    element: <PublicLayout />,

    children: [

      {
        path: "/",

        element: <HomePage />,
      },


      {
        path: "/vuelos",

        element: <FlightsPage />,
      },


      {
        path: "/vuelos/:id",

        element: <FlightDetailPage />,
      },


      {
        path: "/login",

        element: <LoginPage />,
      },

    ],
  },





  // ==================================================
  // PRIVATE ROUTES
  // ==================================================

  {
    element: (

      <ProtectedRoute>

        <PrivateLayout />

      </ProtectedRoute>

    ),


    children: [



      // =====================
      // Dashboard
      // =====================

      {
        path: "/private/dashboard",

        element: <DashboardPage />,
      },



      // =====================
      // Infrastructure
      // =====================

      {
        path: "/private/infraestructura/aeropuertos",

        element: <AirportsPage />,
      },

      {
        path: "/private/infraestructura/aerolineas",

        element: <AirlinesPage />,
      },

      {
        path: "/operaciones/clima",
        element: <WeatherPage />,
      },


      {
        path: "/private/infraestructura/aviones",

        element: <AircraftPage />,
      },


      {
        path: "/private/infraestructura/mantenimientos",

        element: <MaintenancePage />,
      },


      {
        path: "/private/infraestructura/terminales",

        element: <TerminalsPage />,
      },


      {
        path: "/private/infraestructura/puertas-embarque",

        element: <GatesPage />,
      },





      // =====================
      // Operations
      // =====================

      {
        path: "/private/operaciones/vuelos",

        element: <FlightsManagementPage />,
      },


      {
        path: "/private/operaciones/rutas",

        element: <RoutesPage />,
      },
      {
        path: "/operaciones/escalas",
        element: <StopoversPage />,
      },


      {
        path: "/private/operaciones/horarios",

        element: <SchedulesPage />,
      },


      {
        path: "/private/operaciones/incidentes",

        element: <IncidentsPage />,
      },


      {
        path: "/private/operaciones/control-trafico",

        element: <TrafficControlPage />,
      },

      {
        path: "/operaciones/estado-vuelo",
        element: <FlightStatusPage />,
      },
      {
        path: "/operaciones/autorizaciones-vuelo",
        element: <FlightAuthorizationsPage />,
      },
      {
        path: "/operaciones/historial-estados-vuelo",
        element: <FlightStatusHistoryPage />,
      },






      // =====================
      // Staff
      // =====================

      {
        path: "/private/personal/empleados",

        element: <EmployeesPage />,
      },


      {
        path: "/private/personal/pilotos",

        element: <PilotsPage />,
      },


      {
        path: "/private/personal/tripulaciones",

        element: <CrewPage />,
      },
      {
        path: "/private/personal/asignacion-tripulacion",
        element: <CrewAssignmentsPage />,
      },


      {
        path: "/private/personal/asignacion-pista",

        element: <RunwayAssignmentsPage />,
      },



    ],

  },





  // ==================================================
  // NOT FOUND
  // ==================================================

  {
    path: "*",

    element: (

      <Navigate

        to="/"

        replace

      />

    ),

  },


]);





export default function AppRouter() {

  return (

    <RouterProvider router={router} />

  );

}