// src/presentation/layouts/PrivateLayout.tsx

import {
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from 'react-router-dom'

import {
  ChevronDown,
  ChevronRight,
  ExternalLink,
  LayoutDashboard,
  LogOut,
  Menu,
  Plane,
  PlaneTakeoff,
  RadioTower,
  Users,
  Wrench,
  X,
  type LucideIcon,
} from 'lucide-react'

import { useAuthStore } from '@/presentation/store/auth.store'
import { canAccess } from '@/infrastructure/config/permissions'

type AccessUser = NonNullable<
  ReturnType<typeof useAuthStore.getState>['user']
>

interface NavigationItem {
  label: string
  to: string
}

interface NavigationSection {
  title: string
  icon: LucideIcon
  items: NavigationItem[]
}

const navigationSections: NavigationSection[] = [
  {
    title: 'Torre de control',
    icon: RadioTower,
    items: [
      {
        label: 'Control de tráfico',
        to: '/private/operaciones/control-trafico',
      },
      {
        label: 'Pistas',
        to: '/private/personal/pistas',
      },
      {
        label: 'Asignación de pista',
        to: '/private/personal/asignacion-pista',
      },
      {
        label: 'Autorizaciones de vuelo',
        to: '/private/operaciones/autorizaciones-vuelo',
      },
      {
        label: 'Vuelos',
        to: '/private/operaciones/vuelos',
      },
      {
        label: 'Estado de vuelo',
        to: '/private/operaciones/estado-vuelo',
      },
      {
        label: 'Historial de estados',
        to: '/private/operaciones/historial-estados-vuelo',
      },
    ],
  },
  {
    title: 'Mantenimiento',
    icon: Wrench,
    items: [
      {
        label: 'Aviones',
        to: '/private/infraestructura/aviones',
      },
      {
        label: 'Mantenimientos',
        to: '/private/infraestructura/mantenimientos',
      },
      {
        label: 'Incidentes',
        to: '/private/operaciones/incidentes',
      },
    ],
  },
  {
    title: 'Operaciones de vuelo',
    icon: PlaneTakeoff,
    items: [
      {
        label: 'Aerolíneas',
        to: '/private/infraestructura/aerolineas',
      },
      {
        label: 'Rutas',
        to: '/private/operaciones/rutas',
      },
      {
        label: 'Escalas',
        to: '/private/operaciones/escalas',
      },
      {
        label: 'Horarios programados',
        to: '/private/operaciones/horarios',
      },
      {
        label: 'Clima',
        to: '/private/operaciones/clima',
      },
      {
        label: 'Aeropuertos',
        to: '/private/infraestructura/aeropuertos',
      },
      {
        label: 'Terminales',
        to: '/private/infraestructura/terminales',
      },
      {
        label: 'Puertas de embarque',
        to: '/private/infraestructura/puertas-embarque',
      },
    ],
  },
  {
    title: 'Personal / RRHH',
    icon: Users,
    items: [
      {
        label: 'Empleados',
        to: '/private/personal/empleados',
      },
      {
        label: 'Pilotos',
        to: '/private/personal/pilotos',
      },
      {
        label: 'Tripulación',
        to: '/private/personal/tripulacion',
      },
      {
        label: 'Asignación de tripulación',
        to: '/private/personal/asignacion-tripulacion',
      },
    ],
  },
]

const dashboardItem: NavigationItem = {
  label: 'Dashboard',
  to: '/private/dashboard',
}

export default function PrivateLayout() {
  const navigate = useNavigate()
  const location = useLocation()

  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const currentPageTitle = useMemo(() => {
    return getCurrentPageTitle(location.pathname)
  }, [location.pathname])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!isMobileMenuOpen) {
      document.body.style.overflow = ''
      return
    }

    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  async function handleLogout() {
    try {
      setIsLoggingOut(true)

      await logout()

      navigate('/login', {
        replace: true,
      })
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Sidebar de escritorio */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r bg-card lg:flex lg:flex-col">
        <SidebarContent
          user={user}
          pathname={location.pathname}
          isLoggingOut={isLoggingOut}
          onLogout={handleLogout}
        />
      </aside>

      {/* Fondo oscuro del menú móvil */}
      {isMobileMenuOpen && (
        <button
          type="button"
          aria-label="Cerrar menú"
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar móvil */}
      <aside
        className={[
          'fixed inset-y-0 left-0 z-50 flex w-[85%] max-w-80 flex-col border-r bg-card shadow-2xl transition-transform duration-300 lg:hidden',
          isMobileMenuOpen
            ? 'translate-x-0'
            : '-translate-x-full',
        ].join(' ')}
      >
        <div className="absolute right-3 top-3">
          <button
            type="button"
            aria-label="Cerrar menú"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-muted hover:text-foreground"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <SidebarContent
          user={user}
          pathname={location.pathname}
          isLoggingOut={isLoggingOut}
          onLogout={handleLogout}
          onNavigate={() => setIsMobileMenuOpen(false)}
        />
      </aside>

      {/* Contenido */}
      <div className="min-h-screen lg:pl-72">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/95 px-4 backdrop-blur sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              aria-label="Abrir menú"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border bg-card text-muted-foreground transition hover:bg-muted hover:text-foreground lg:hidden"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>

            <div className="min-w-0">
              <p className="truncate text-sm text-muted-foreground">
                Panel administrativo
              </p>

              <h1 className="truncate text-base font-semibold sm:text-lg">
                {currentPageTitle}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/"
              className="hidden h-10 items-center gap-2 rounded-lg border bg-card px-3 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground sm:flex"
            >
              <ExternalLink className="h-4 w-4" />
              Ver sitio público
            </Link>

            <div className="hidden items-center gap-3 border-l pl-3 md:flex">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                {user?.is_staff ? 'A' : 'U'}
              </div>

              <div className="max-w-36 leading-tight">
                <p className="truncate text-sm font-semibold">
                  {user?.is_staff
                    ? 'Administrador'
                    : 'Usuario'}
                </p>

                <p className="truncate text-xs text-muted-foreground">
                  {getRoleLabel(user)}
                </p>
              </div>
            </div>

            <button
              type="button"
              aria-label="Cerrar sesión"
              disabled={isLoggingOut}
              className="flex h-10 w-10 items-center justify-center rounded-lg border bg-card text-muted-foreground transition hover:border-destructive/30 hover:bg-destructive/10 hover:text-destructive disabled:cursor-not-allowed disabled:opacity-50"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </header>

        {/* Contenido de las páginas */}
        <main className="min-h-[calc(100vh-4rem)] p-4 sm:p-6 lg:p-8">
          <div className="mx-auto w-full max-w-[1600px]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

interface SidebarContentProps {
  user: AccessUser | null
  pathname: string
  isLoggingOut: boolean
  onLogout(): Promise<void>
  onNavigate?(): void
}

function SidebarContent({
  user,
  pathname,
  isLoggingOut,
  onLogout,
  onNavigate,
}: SidebarContentProps) {
  return (
    <>
      {/* Marca */}
      <div className="flex h-20 shrink-0 items-center border-b px-5">
        <Link
          to="/private/dashboard"
          className="flex min-w-0 items-center gap-3"
          onClick={onNavigate}
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <Plane className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <p className="truncate font-bold">
              Cotopaxi Airlines
            </p>

            <p className="truncate text-xs text-muted-foreground">
              Administración aeroportuaria
            </p>
          </div>
        </Link>
      </div>

      {/* Navegación */}
      <nav className="flex-1 space-y-2 overflow-y-auto px-3 py-5">
        <SidebarItem
          to={dashboardItem.to}
          label={dashboardItem.label}
          icon={<LayoutDashboard className="h-4 w-4" />}
          user={user}
          onNavigate={onNavigate}
        />

        <div className="my-4 border-t" />

        {navigationSections.map((section) => (
          <SidebarSection
            key={section.title}
            section={section}
            user={user}
            pathname={pathname}
            onNavigate={onNavigate}
          />
        ))}
      </nav>

      {/* Usuario */}
      <div className="shrink-0 border-t p-3">
        <div className="rounded-xl bg-muted/50 p-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">
              {user?.is_staff ? 'A' : 'U'}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">
                {user?.is_staff
                  ? 'Administrador'
                  : 'Usuario del sistema'}
              </p>

              <p className="truncate text-xs text-muted-foreground">
                {getRoleLabel(user)}
              </p>
            </div>
          </div>

          <button
            type="button"
            disabled={isLoggingOut}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border bg-background px-3 py-2 text-sm font-medium text-muted-foreground transition hover:border-destructive/30 hover:bg-destructive/10 hover:text-destructive disabled:cursor-not-allowed disabled:opacity-50"
            onClick={onLogout}
          >
            <LogOut className="h-4 w-4" />

            {isLoggingOut
              ? 'Cerrando sesión...'
              : 'Cerrar sesión'}
          </button>
        </div>
      </div>
    </>
  )
}

interface SidebarSectionProps {
  section: NavigationSection
  user: AccessUser | null
  pathname: string
  onNavigate?(): void
}

function SidebarSection({
  section,
  user,
  pathname,
  onNavigate,
}: SidebarSectionProps) {
  const accessibleItems = section.items.filter((item) =>
    hasRouteAccess(user, item.to),
  )

  const containsActiveRoute = accessibleItems.some(
    (item) =>
      pathname === item.to ||
      pathname.startsWith(`${item.to}/`),
  )

  const [isOpen, setIsOpen] = useState(containsActiveRoute)

  useEffect(() => {
    if (containsActiveRoute) {
      setIsOpen(true)
    }
  }, [containsActiveRoute])

  if (accessibleItems.length === 0) {
    return null
  }

  const SectionIcon = section.icon

  return (
    <div className="space-y-1">
      <button
        type="button"
        className={[
          'flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm font-semibold transition',
          containsActiveRoute
            ? 'bg-primary/5 text-primary'
            : 'text-muted-foreground hover:bg-muted hover:text-foreground',
        ].join(' ')}
        onClick={() => setIsOpen((current) => !current)}
      >
        <span className="flex min-w-0 items-center gap-3">
          <SectionIcon className="h-4 w-4 shrink-0" />

          <span className="truncate">
            {section.title}
          </span>
        </span>

        <ChevronDown
          className={[
            'h-4 w-4 shrink-0 transition-transform duration-200',
            isOpen ? 'rotate-180' : '',
          ].join(' ')}
        />
      </button>

      <div
        className={[
          'grid transition-all duration-200',
          isOpen
            ? 'grid-rows-[1fr] opacity-100'
            : 'grid-rows-[0fr] opacity-0',
        ].join(' ')}
      >
        <div className="overflow-hidden">
          <div className="ml-5 space-y-1 border-l py-1 pl-3">
            {accessibleItems.map((item) => (
              <SidebarItem
                key={item.to}
                to={item.to}
                label={item.label}
                user={user}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

interface SidebarItemProps {
  to: string
  label: string
  user: AccessUser | null
  icon?: ReactNode
  onNavigate?(): void
}

function SidebarItem({
  to,
  label,
  user,
  icon,
  onNavigate,
}: SidebarItemProps) {
  if (!hasRouteAccess(user, to)) {
    return null
  }

  return (
    <NavLink
      to={to}
      end={to === '/private/dashboard'}
      onClick={onNavigate}
      className={({ isActive }) =>
        [
          'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors',
          isActive
            ? 'bg-primary text-primary-foreground shadow-sm'
            : 'text-muted-foreground hover:bg-muted hover:text-foreground',
        ].join(' ')
      }
    >
      {icon ?? (
        <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-60 transition-transform group-hover:translate-x-0.5" />
      )}

      <span className="truncate">
        {label}
      </span>
    </NavLink>
  )
}

function hasRouteAccess(
  user: AccessUser | null,
  route: string,
) {
  if (!user) {
    return false
  }

  if (user.is_staff) {
    return true
  }

  return canAccess(user, route)
}

function getRoleLabel(user: AccessUser | null) {
  if (!user) {
    return 'Sin sesión'
  }

  if (user.is_staff) {
    return 'Acceso administrativo'
  }

  if (!user.role) {
    return 'Acceso limitado'
  }

  return user.role
    .replaceAll('_', ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
}

function getCurrentPageTitle(pathname: string) {
  if (
    pathname === dashboardItem.to ||
    pathname.startsWith(`${dashboardItem.to}/`)
  ) {
    return dashboardItem.label
  }

  for (const section of navigationSections) {
    const currentItem = section.items.find(
      (item) =>
        pathname === item.to ||
        pathname.startsWith(`${item.to}/`),
    )

    if (currentItem) {
      return currentItem.label
    }
  }

  return 'Panel administrativo'
}