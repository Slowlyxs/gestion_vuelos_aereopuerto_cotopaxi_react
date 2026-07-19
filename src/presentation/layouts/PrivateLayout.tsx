// src/presentation/layouts/PrivateLayout.tsx

import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/presentation/store/auth.store";
import { canAccess } from '@/infrastructure/config/permissions'

export default function PrivateLayout() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  async function handleLogout() {
    await logout();
    navigate("/login", { replace: true });
  }

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden w-64 border-r bg-card p-5 md:block">
        <h2 className="mb-8 text-xl font-bold">Cotopaxi Airlines</h2>

        <nav className="space-y-2">
          <SidebarItem to="/private/dashboard" label="Dashboard" user={user} />

          <SidebarSection title="TORRE DE CONTROL" user={user} routes={[
            "/private/operaciones/control-trafico",
            "/private/personal/pistas",
            "/private/personal/asignacion-pista",
            "/private/operaciones/autorizaciones-vuelo",
            "/private/operaciones/vuelos",
            "/private/operaciones/estado-vuelo",
            "/private/operaciones/historial-estados-vuelo",
          ]}>
            <SidebarItem to="/private/operaciones/control-trafico" label="Control tráfico" user={user} />
            <SidebarItem to="/private/personal/pistas" label="Pistas" user={user} />
            <SidebarItem to="/private/personal/asignacion-pista" label="Asignación de pista" user={user} />
            <SidebarItem to="/private/operaciones/autorizaciones-vuelo" label="Autorizaciones de vuelo" user={user} />
            <SidebarItem to="/private/operaciones/vuelos" label="Vuelos" user={user} />
            <SidebarItem to="/private/operaciones/estado-vuelo" label="Estado de vuelo" user={user} />
            <SidebarItem to="/private/operaciones/historial-estados-vuelo" label="Historial estado de vuelos" user={user} />
          </SidebarSection>

          <SidebarSection title="MANTENIMIENTO" user={user} routes={[
            "/private/infraestructura/aviones",
            "/private/infraestructura/mantenimientos",
            "/private/operaciones/incidentes",
          ]}>
            <SidebarItem to="/private/infraestructura/aviones" label="Aviones" user={user} />
            <SidebarItem to="/private/infraestructura/mantenimientos" label="Mantenimientos" user={user} />
            <SidebarItem to="/private/operaciones/incidentes" label="Incidentes" user={user} />
          </SidebarSection>

          <SidebarSection title="OPERACIONES DE VUELO" user={user} routes={[
            "/private/infraestructura/aerolineas",
            "/private/operaciones/rutas",
            "/private/operaciones/escalas",
            "/private/operaciones/horarios",
            "/private/operaciones/Clima",
            "/private/infraestructura/aeropuertos",
            "/private/infraestructura/terminales",
            "/private/infraestructura/puertas-embarque",
          ]}>
            <SidebarItem to="/private/infraestructura/aerolineas" label="Aerolíneas" user={user} />
            <SidebarItem to="/private/operaciones/rutas" label="Rutas" user={user} />
            <SidebarItem to="/private/operaciones/escalas" label="Escalas" user={user} />
            <SidebarItem to="/private/operaciones/horarios" label="Horarios programados" user={user} />
            <SidebarItem to="/private/operaciones/Clima" label="Clima" user={user} />
            <SidebarItem to="/private/infraestructura/aeropuertos" label="Aeropuertos" user={user} />
            <SidebarItem to="/private/infraestructura/terminales" label="Terminales" user={user} />
            <SidebarItem to="/private/infraestructura/puertas-embarque" label="Puertas embarque" user={user} />
          </SidebarSection>

          <SidebarSection title="PERSONAL / RRHH" user={user} routes={[
            "/private/personal/empleados",
            "/private/personal/pilotos",
            "/private/personal/tripulacion",
            "/private/personal/asignacion-tripulacion",
          ]}>
            <SidebarItem to="/private/personal/empleados" label="Empleados" user={user} />
            <SidebarItem to="/private/personal/pilotos" label="Pilotos" user={user} />
            <SidebarItem to="/private/personal/tripulacion" label="Tripulación" user={user} />
            <SidebarItem to="/private/personal/asignacion-tripulacion" label="Asignación de tripulación" user={user} />
          </SidebarSection>
        </nav>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b px-6">
          <h1 className="font-semibold">Panel administrativo</h1>
          <button
            onClick={handleLogout}
            className="rounded-md border px-4 py-2 text-sm hover:bg-muted"
          >
            Cerrar sesión
          </button>
        </header>

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

type AccessUser = { is_staff: boolean; role: string | null };

interface SidebarSectionProps {
  title: string;
  user: AccessUser | null;
  routes: string[];
  children: React.ReactNode;
}

function SidebarSection({ title, user, routes, children }: SidebarSectionProps) {
  const hasAnyAccess = !!user && (user.is_staff || routes.some((r) => canAccess(user, r)));

  if (!hasAnyAccess) return null;

  return (
    <>
      <p className="mt-6 text-xs font-semibold text-muted-foreground">
        {title}
      </p>
      {children}
    </>
  );
}

interface SidebarItemProps {
  to: string;
  label: string;
  user: AccessUser | null;
}

function SidebarItem({ to, label, user }: SidebarItemProps) {
  if (!user || !canAccess(user, to)) return null;

  return (
    <Link
      to={to}
      className="block rounded-md px-3 py-2 text-sm hover:bg-muted"
    >
      {label}
    </Link>
  );
}