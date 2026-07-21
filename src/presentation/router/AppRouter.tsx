// src/presentation/router/AppRouter.tsx

import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import PublicLayout from "@/presentation/layouts/PublicLayout";
import PrivateLayout from "@/presentation/layouts/PrivateLayout";
import SplashPage from "@/presentation/pages/SplashPage";

// PUBLIC PAGES
import HomePage from "@/presentation/pages/public/HomePage";
import FlightsPage from "@/presentation/pages/public/FlightsPage";
import FlightDetailPage from "@/presentation/pages/public/FlightDetailPage";
import AirlinesPage from "@/presentation/pages/public/AirlinesPage";
import LoginPage from "@/presentation/pages/auth/LoginPage";
import InformationPage from "@/presentation/pages/public/InformationPage";
import ContactPage from "@/presentation/pages/public/ContactPage";

// DASHBOARD
import DashboardPage from "@/presentation/pages/private/dashboard/DashboardPage";

// INFRASTRUCTURE (TECNICO)
import AirportsPage from "@/presentation/pages/private/infrastructure/AirportsPage";
import AircraftPage from "../pages/private/infrastructure/AircraftPage";
import MaintenancePage from "@/presentation/pages/private/infrastructure/MaintenancePage";
import TerminalsPage from "@/presentation/pages/private/infrastructure/TerminalsPage";
import GatesPage from "@/presentation/pages/private/infrastructure/GatesPage";

// OPERATIONS (OPERADOR_VUELO)
import FlightsManagementPage from "@/presentation/pages/private/operations/FlightsManagementPage";
import RoutesPage from "@/presentation/pages/private/operations/RoutesPage";
import SchedulesPage from "@/presentation/pages/private/operations/SchedulesPage";
import IncidentsPage from "@/presentation/pages/private/infrastructure/IncidentsPage";
import WeatherPage from "../pages/private/operations/WeatherPage";
import FlightStatusPage from "../pages/private/operations/FlightStatusPage";
import StopoversPage from "../pages/private/operations/StopoversPage";
import FlightStatusHistoryPage from "../pages/private/operations/FlightStatusHistoryPage";

// TRAFFIC CONTROL (CONTROLADOR)
import TrafficControlPage from "@/presentation/pages/private/traffic-control/TrafficControlPage";
import RunwaysPage from "../pages/private/traffic-control/Runway";
import RunwayAssignmentsPage from "@/presentation/pages/private/traffic-control/RunwayAssignmentsPage";
import FlightAuthorizationsPage from "../pages/private/traffic-control/FlightAuthorizationsPage";

// STAFF (RRHH)
import EmployeesPage from "@/presentation/pages/private/staff/EmployeesPage";
import PilotsPage from "@/presentation/pages/private/staff/PilotsPage";
import CrewPage from "@/presentation/pages/private/staff/CrewPage";
import CrewAssignmentsPage from "../pages/private/staff/CrewAssignmentsPage";
import AirlinesPagePublic from "@/presentation/pages/public/AirlinesPage";
import AirlinesPagePrivate from "../pages/private/infrastructure/AirlinesPage";
import RegisterPage from "../pages/auth/RegisterPage";


const router = createBrowserRouter([

  // ==================================================
  // PUBLIC ROUTES
  // ==================================================
  {
    element: <PublicLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/vuelos", element: <FlightsPage /> },
      { path: "/vuelos/:id", element: <FlightDetailPage /> },
      { path: "/aerolineas", element: <AirlinesPagePublic/> },
      { path: "/login", element: <LoginPage /> },
      { path: "/informacion", element: <InformationPage />,},
      { path: "/contacto", element: <ContactPage />, },
      { path: "/splash", element: <SplashPage />, },
      { path: "/register", element: <RegisterPage/> }
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

      { path: "/private/dashboard", element: <DashboardPage /> },

      // Infrastructure (TECNICO)
      { path: "/private/infraestructura/aeropuertos", element: <AirportsPage /> },
      { path: "/private/infraestructura/aerolineas", element: <AirlinesPagePrivate /> },
      { path: "/private/infraestructura/aviones", element: <AircraftPage /> },
      { path: "/private/infraestructura/mantenimientos", element: <MaintenancePage /> },
      { path: "/private/infraestructura/terminales", element: <TerminalsPage /> },
      { path: "/private/infraestructura/puertas-embarque", element: <GatesPage /> },

      // Operations (OPERADOR_VUELO)
      { path: "/private/operaciones/vuelos", element: <FlightsManagementPage /> },
      { path: "/private/operaciones/rutas", element: <RoutesPage /> },
      { path: "/private/operaciones/escalas", element: <StopoversPage /> },
      { path: "/private/operaciones/Clima", element: <WeatherPage /> },
      { path: "/private/operaciones/horarios", element: <SchedulesPage /> },
      { path: "/private/operaciones/incidentes", element: <IncidentsPage /> },
      { path: "/private/operaciones/estado-vuelo", element: <FlightStatusPage /> },
      { path: "/private/operaciones/historial-estados-vuelo", element: <FlightStatusHistoryPage /> },

      // Traffic control (CONTROLADOR)
      { path: "/private/operaciones/control-trafico", element: <TrafficControlPage /> },
      { path: "/private/operaciones/autorizaciones-vuelo", element: <FlightAuthorizationsPage /> },
      { path: "/private/personal/pistas", element: <RunwaysPage /> },
      { path: "/private/personal/asignacion-pista", element: <RunwayAssignmentsPage /> },

      // Staff (RRHH)
      { path: "/private/personal/empleados", element: <EmployeesPage /> },
      { path: "/private/personal/pilotos", element: <PilotsPage /> },
      { path: "/private/personal/tripulacion", element: <CrewPage /> },
      { path: "/private/personal/asignacion-tripulacion", element: <CrewAssignmentsPage /> },

    ],
  },

  // ==================================================
  // NOT FOUND
  // ==================================================
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },

]);


export default function AppRouter() {
  return <RouterProvider router={router} />;
} 