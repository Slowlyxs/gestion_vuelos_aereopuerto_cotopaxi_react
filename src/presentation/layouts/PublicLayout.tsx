// src/presentation/layouts/PublicLayout.tsx

import { useEffect, useState } from 'react'
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
} from 'react-router-dom'
import {
  Building2,
  LayoutDashboard,
  LogIn,
  Mail,
  MapPin,
  Menu,
  Phone,
  Plane,
  X,
} from 'lucide-react'

import { useAuthStore } from '@/presentation/store/auth.store'
import { Button } from '@/presentation/components/ui/button'

const navigationItems = [
  {
    label: 'Inicio',
    to: '/',
  },
  {
    label: 'Vuelos',
    to: '/vuelos',
  },
  {
    label: 'Aerolíneas',
    to: '/aerolineas',
  },
  {
    label: 'Información',
    to: '/informacion',
  },
  {
    label: 'Contacto',
    to: '/contacto',
  },
]

export default function PublicLayout() {
  const location = useLocation()
  const user = useAuthStore((state) => state.user)

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Cerrar el menú móvil cada vez que cambia la ruta
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3"
            aria-label="Ir al inicio"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
              <Plane className="h-5 w-5" />
            </div>

            <div className="leading-tight">
              <p className="font-bold tracking-tight">
                Cotopaxi Airlines
              </p>

              <p className="hidden text-xs text-muted-foreground sm:block">
                Tu viaje comienza aquí
              </p>
            </div>
          </Link>

          {/* Navegación de escritorio */}
          <nav
            className="hidden items-center gap-1 lg:flex"
            aria-label="Navegación principal"
          >
            {navigationItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  [
                    'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                  ].join(' ')
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Acceso y menú móvil */}
          <div className="flex items-center gap-2">
           {user ? (
                <Button
                  asChild
                  className="hidden sm:inline-flex"
                >
                  <Link to="/private/dashboard">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Panel privado
                  </Link>
                </Button>
              ) : !user ? (
                <Button
                  asChild
                  className="hidden sm:inline-flex"
                >
                  <Link to="/login">
                    <LogIn className="mr-2 h-4 w-4" />
                    Ingresar
                  </Link>
                </Button>
              ) : null}

            <Button
              asChild
              variant="outline"
              className="hidden sm:inline-flex"
            >
              <Link to="/reservas">
                Reservar vuelo
              </Link>
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="lg:hidden"
              aria-label={
                isMobileMenuOpen
                  ? 'Cerrar menú'
                  : 'Abrir menú'
              }
              aria-expanded={isMobileMenuOpen}
              onClick={() => {
                setIsMobileMenuOpen((current) => !current)
              }}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Menú móvil */}
        {isMobileMenuOpen && (
          <div className="border-t bg-background lg:hidden">
            <nav
              className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6"
              aria-label="Navegación móvil"
            >
              {navigationItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    [
                      'rounded-lg px-4 py-3 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                    ].join(' ')
                  }
                >
                  {item.label}
                </NavLink>
              ))}

              <div className="mt-3 border-t pt-4">
                <Button
                  asChild
                  className="w-full"
                >
                  {user ? (
                    <Link to="/private/dashboard">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Ir al panel privado
                    </Link>
                  ) : (
                    <Link to="/login">
                      <LogIn className="mr-2 h-4 w-4" />
                      Iniciar sesión
                    </Link>
                  )}
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Contenido de cada página */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
          {/* Marca */}
          <div>
            <Link
              to="/"
              className="flex items-center gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Plane className="h-5 w-5" />
              </div>

              <span className="font-bold">
                Cotopaxi Airlines
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
              Consulta vuelos, aerolíneas e información aeroportuaria
              desde una plataforma rápida, segura y accesible.
            </p>
          </div>

          {/* Navegación */}
          <div>
            <h2 className="font-semibold">
              Navegación
            </h2>

            <div className="mt-4 flex flex-col gap-3">
              {navigationItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="w-fit text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Información */}
          <div>
            <h2 className="font-semibold">
              Información para viajar
            </h2>

            <div className="mt-4 flex flex-col gap-3">
              <Link
                to="/informacion"
                className="w-fit text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                Equipaje
              </Link>

              <Link
                to="/informacion"
                className="w-fit text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                Documentación
              </Link>

              <Link
                to="/informacion"
                className="w-fit text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                Horarios y recomendaciones
              </Link>

              <Link
                to="/vuelos"
                className="w-fit text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                Estado de vuelos
              </Link>
            </div>
          </div>

          {/* Contacto */}
          <div>
            <h2 className="font-semibold">
              Contacto
            </h2>

            <div className="mt-4 space-y-4 text-sm text-muted-foreground">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />

                <span>
                  Aeropuerto Internacional Cotopaxi, Ecuador
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-primary" />

                <span>
                  +593 00 000 0000
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-primary" />

                <span>
                  contacto@cotopaxiairlines.com
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Building2 className="h-4 w-4 shrink-0 text-primary" />

                <span>
                  Atención de lunes a domingo
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Parte inferior */}
        <div className="border-t">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-5 text-center text-sm text-muted-foreground sm:flex-row sm:text-left lg:px-8">
            <p>
              © {new Date().getFullYear()} Cotopaxi Airlines. Todos los
              derechos reservados.
            </p>

            <div className="flex items-center gap-5">
              <Link
                to="/informacion"
                className="hover:text-primary"
              >
                Términos
              </Link>

              <Link
                to="/informacion"
                className="hover:text-primary"
              >
                Privacidad
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}