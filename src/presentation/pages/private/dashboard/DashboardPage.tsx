// src/presentation/pages/private/dashboard/DashboardPage.tsx

import {
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

import { Link } from 'react-router-dom'

import {
  AlertTriangle,
  ArrowRight,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  Plane,
  RadioTower,
  Search,
  Terminal,
  Users,
} from 'lucide-react'

import { useAuthStore } from '@/presentation/store/auth.store'
import { useAirportStore } from '@/presentation/store/airport.store'
import { useAirlineStore } from '@/presentation/store/airline.store'
import { useFlightStore } from '@/presentation/store/flight.store'
import { useEmployeeStore } from '@/presentation/store/employee.store'
import { useTerminalStore } from '@/presentation/store/terminal.store'
import { useTrafficControlStore } from '@/presentation/store/traffic-control.store'

import { Input } from '@/presentation/components/ui/input'
import { Button } from '@/presentation/components/ui/button'

interface ModuleItem {
  title: string
  description: string
  path: string
  category: string
  icon: ReactNode
  count?: number
}

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user)

  const {
    airports,
    loadAirports,
    isLoading: airportsLoading,
  } = useAirportStore()

  const {
    airlines,
    loadAirlines,
    isLoading: airlinesLoading,
  } = useAirlineStore()

  const {
    flights,
    loadFlights,
    isLoading: flightsLoading,
  } = useFlightStore()

  const {
    employees,
    loadEmployees,
    isLoading: employeesLoading,
  } = useEmployeeStore()

  const {
    terminals,
    loadTerminals,
    isLoading: terminalsLoading,
  } = useTerminalStore()

  const {
    trafficControls,
    loadTrafficControls,
    isLoading: trafficLoading,
  } = useTrafficControlStore()

  const [moduleSearch, setModuleSearch] = useState('')

  useEffect(() => {
    loadAirports()
    loadAirlines()
    loadFlights()
    loadEmployees()
    loadTerminals()
    loadTrafficControls()
  }, [
    loadAirports,
    loadAirlines,
    loadFlights,
    loadEmployees,
    loadTerminals,
    loadTrafficControls,
  ])

  const isLoading =
    airportsLoading ||
    airlinesLoading ||
    flightsLoading ||
    employeesLoading ||
    terminalsLoading ||
    trafficLoading

  const recentFlights = useMemo(() => {
    return [...flights]
      .sort((firstFlight, secondFlight) => {
        return (
          new Date(secondFlight.fecha).getTime() -
          new Date(firstFlight.fecha).getTime()
        )
      })
      .slice(0, 5)
  }, [flights])

  const programmedFlights = useMemo(() => {
    return flights.filter((flight) =>
      flight.estado
        .toLowerCase()
        .includes('programado'),
    ).length
  }, [flights])

  const delayedFlights = useMemo(() => {
    return flights.filter((flight) => {
      const status = flight.estado.toLowerCase()

      return (
        status.includes('retrasado') ||
        status.includes('demorado')
      )
    }).length
  }, [flights])

  const modules = useMemo<ModuleItem[]>(
    () => [
      {
        title: 'Aeropuertos',
        description:
          'Administra aeropuertos, ciudades y códigos IATA.',
        path: '/private/infraestructura/aeropuertos',
        category: 'Infraestructura',
        icon: <MapPin className="h-5 w-5" />,
        count: airports.length,
      },
      {
        title: 'Aerolíneas',
        description:
          'Gestiona las aerolíneas registradas.',
        path: '/private/infraestructura/aerolineas',
        category: 'Infraestructura',
        icon: <Building2 className="h-5 w-5" />,
        count: airlines.length,
      },
      {
        title: 'Terminales',
        description:
          'Gestiona las terminales de cada aeropuerto.',
        path: '/private/infraestructura/terminales',
        category: 'Infraestructura',
        icon: <Terminal className="h-5 w-5" />,
        count: terminals.length,
      },
      {
        title: 'Vuelos',
        description:
          'Consulta y administra las operaciones de vuelo.',
        path: '/private/operaciones/vuelos',
        category: 'Operaciones',
        icon: <Plane className="h-5 w-5" />,
        count: flights.length,
      },
      {
        title: 'Control de tráfico',
        description:
          'Gestiona autorizaciones y control aéreo.',
        path: '/private/operaciones/control-trafico',
        category: 'Torre de control',
        icon: <RadioTower className="h-5 w-5" />,
        count: trafficControls.length,
      },
      {
        title: 'Empleados',
        description:
          'Administra el personal del aeropuerto.',
        path: '/private/personal/empleados',
        category: 'Personal',
        icon: <Users className="h-5 w-5" />,
        count: employees.length,
      },
      {
        title: 'Pilotos',
        description:
          'Gestiona pilotos y licencias.',
        path: '/private/personal/pilotos',
        category: 'Personal',
        icon: <Users className="h-5 w-5" />,
      },
      {
        title: 'Asignación de tripulación',
        description:
          'Asigna empleados y tripulación a los vuelos.',
        path: '/private/personal/asignacion-tripulacion',
        category: 'Personal',
        icon: <Users className="h-5 w-5" />,
      },
      {
        title: 'Horarios',
        description:
          'Gestiona las horas programadas de los vuelos.',
        path: '/private/operaciones/horarios',
        category: 'Operaciones',
        icon: <Clock3 className="h-5 w-5" />,
      },
      {
        title: 'Incidentes',
        description:
          'Registra eventos e incidentes operativos.',
        path: '/private/operaciones/incidentes',
        category: 'Operaciones',
        icon: <AlertTriangle className="h-5 w-5" />,
      },
      {
        title: 'Rutas',
        description:
          'Administra los aeropuertos de origen y destino.',
        path: '/private/operaciones/rutas',
        category: 'Operaciones',
        icon: <MapPin className="h-5 w-5" />,
      },
      {
        title: 'Mantenimientos',
        description:
          'Controla los mantenimientos de las aeronaves.',
        path: '/private/infraestructura/mantenimientos',
        category: 'Mantenimiento',
        icon: <CheckCircle2 className="h-5 w-5" />,
      },
    ],
    [
      airports.length,
      airlines.length,
      terminals.length,
      flights.length,
      trafficControls.length,
      employees.length,
    ],
  )

  const filteredModules = useMemo(() => {
    const normalizedSearch = moduleSearch
      .trim()
      .toLowerCase()

    if (!normalizedSearch) {
      return modules
    }

    return modules.filter((module) => {
      return (
        module.title
          .toLowerCase()
          .includes(normalizedSearch) ||
        module.description
          .toLowerCase()
          .includes(normalizedSearch) ||
        module.category
          .toLowerCase()
          .includes(normalizedSearch)
      )
    })
  }, [moduleSearch, modules])

  const currentDate = new Intl.DateTimeFormat(
    'es-EC',
    {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    },
  ).format(new Date())

  return (
    <div className="space-y-8">
      {/* Bienvenida */}
      <section className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-primary/15 via-card to-secondary/10 p-6 shadow-sm sm:p-8">
        <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-primary/10 blur-3xl" />

        <div className="absolute -bottom-20 -left-16 h-52 w-52 rounded-full bg-secondary/10 blur-3xl" />

        <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-background/70 px-3 py-1.5 text-xs font-medium backdrop-blur">
              <CalendarDays className="h-4 w-4 text-primary" />
              {capitalize(currentDate)}
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Bienvenido al panel administrativo
            </h1>

            <p className="mt-3 max-w-2xl text-muted-foreground">
              Controla la infraestructura, los vuelos, el
              personal y las operaciones del aeropuerto desde
              un solo lugar.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/private/operaciones/vuelos">
                  <Plane className="mr-2 h-4 w-4" />
                  Gestionar vuelos
                </Link>
              </Button>

              <Button asChild variant="outline">
                <Link to="/">
                  Ver página pública
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="min-w-64 rounded-2xl border bg-background/70 p-5 shadow-sm backdrop-blur">
            <p className="text-sm text-muted-foreground">
              Sesión actual
            </p>

            <p className="mt-1 text-lg font-bold">
              {user?.is_staff
                ? 'Administrador'
                : 'Usuario autorizado'}
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              {formatRole(user?.role)}
            </p>

            <div className="mt-4 flex items-center gap-2 text-sm text-emerald-700">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              Sistema operativo
            </div>
          </div>
        </div>
      </section>

      {/* Estadísticas principales */}
      <section>
        <div className="mb-5">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Resumen general
          </p>

          <h2 className="mt-1 text-2xl font-bold">
            Estado del sistema
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
          <StatisticCard
            icon={<Plane className="h-5 w-5" />}
            title="Vuelos"
            value={flights.length}
            isLoading={flightsLoading}
            link="/private/operaciones/vuelos"
          />

          <StatisticCard
            icon={<MapPin className="h-5 w-5" />}
            title="Aeropuertos"
            value={airports.length}
            isLoading={airportsLoading}
            link="/private/infraestructura/aeropuertos"
          />

          <StatisticCard
            icon={<Building2 className="h-5 w-5" />}
            title="Aerolíneas"
            value={airlines.length}
            isLoading={airlinesLoading}
            link="/private/infraestructura/aerolineas"
          />

          <StatisticCard
            icon={<Terminal className="h-5 w-5" />}
            title="Terminales"
            value={terminals.length}
            isLoading={terminalsLoading}
            link="/private/infraestructura/terminales"
          />

          <StatisticCard
            icon={<Users className="h-5 w-5" />}
            title="Empleados"
            value={employees.length}
            isLoading={employeesLoading}
            link="/private/personal/empleados"
          />

          <StatisticCard
            icon={<RadioTower className="h-5 w-5" />}
            title="Controles"
            value={trafficControls.length}
            isLoading={trafficLoading}
            link="/private/operaciones/control-trafico"
          />
        </div>
      </section>

      {/* Estado de operaciones */}
      <section className="grid gap-4 md:grid-cols-3">
        <OperationCard
          title="Vuelos programados"
          value={programmedFlights}
          description="Operaciones pendientes"
          icon={<CalendarDays className="h-5 w-5" />}
          type="normal"
        />

        <OperationCard
          title="Vuelos retrasados"
          value={delayedFlights}
          description="Requieren seguimiento"
          icon={<AlertTriangle className="h-5 w-5" />}
          type={delayedFlights > 0 ? 'warning' : 'normal'}
        />

        <OperationCard
          title="Estado del sistema"
          value="Activo"
          description={
            isLoading
              ? 'Actualizando información'
              : 'Datos sincronizados'
          }
          icon={<CheckCircle2 className="h-5 w-5" />}
          type="success"
        />
      </section>

      {/* Buscador de módulos */}
      <section>
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Accesos rápidos
            </p>

            <h2 className="mt-1 text-2xl font-bold">
              Módulos administrativos
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Busca y accede rápidamente a cualquier módulo.
            </p>
          </div>

          <div className="relative w-full sm:max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

            <Input
              type="search"
              value={moduleSearch}
              onChange={(event) =>
                setModuleSearch(event.target.value)
              }
              placeholder="Buscar módulo..."
              className="bg-card pl-9"
            />
          </div>
        </div>

        {filteredModules.length > 0 ? (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filteredModules.map((module) => (
              <ModuleCard
                key={module.path}
                {...module}
              />
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-2xl border border-dashed bg-card px-6 py-12 text-center">
            <Search className="mx-auto h-10 w-10 text-muted-foreground/40" />

            <h3 className="mt-4 font-semibold">
              No encontramos ese módulo
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Prueba con otra palabra como vuelos,
              empleados, rutas o mantenimiento.
            </p>
          </div>
        )}
      </section>

      {/* Vuelos recientes */}
      <section className="overflow-hidden rounded-2xl border bg-card shadow-sm">
        <div className="flex flex-col justify-between gap-4 border-b px-6 py-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Operaciones
            </p>

            <h2 className="mt-1 text-xl font-bold">
              Vuelos recientes
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Últimos vuelos registrados en el sistema.
            </p>
          </div>

          <Button asChild variant="outline">
            <Link to="/private/operaciones/vuelos">
              Ver todos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {flightsLoading ? (
          <div className="space-y-3 p-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-16 animate-pulse rounded-xl bg-muted"
              />
            ))}
          </div>
        ) : recentFlights.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px]">
              <thead className="border-b bg-muted/40">
                <tr>
                  <TableHeader>Código</TableHeader>
                  <TableHeader>Fecha</TableHeader>
                  <TableHeader>Aeronave</TableHeader>
                  <TableHeader>Aerolínea</TableHeader>
                  <TableHeader>Estado</TableHeader>
                  <TableHeader align="right">
                    Detalle
                  </TableHeader>
                </tr>
              </thead>

              <tbody className="divide-y">
                {recentFlights.map((flight) => (
                  <tr
                    key={flight.id}
                    className="transition-colors hover:bg-muted/30"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-primary/10 p-2 text-primary">
                          <Plane className="h-4 w-4" />
                        </div>

                        <div>
                          <p className="font-semibold">
                            {flight.codigo_vuelo}
                          </p>

                          <p className="text-xs text-muted-foreground">
                            Vuelo #{flight.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm">
                      {formatDate(flight.fecha)}
                    </td>

                    <td className="px-6 py-4">
                      <p className="text-sm font-medium">
                        {flight.id_avion.modelo}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        {flight.id_avion.matricula}
                      </p>
                    </td>

                    <td className="px-6 py-4 text-sm">
                      {
                        flight.id_avion.aerolinea
                          .nombre
                      }
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                          flight.estado,
                        )}`}
                      >
                        {capitalize(flight.estado)}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <Button
                        asChild
                        variant="ghost"
                        size="sm"
                      >
                        <Link
                          to={`/private/operaciones/vuelos`}
                        >
                          Administrar
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="px-6 py-14 text-center">
            <Plane className="mx-auto h-10 w-10 text-muted-foreground/40" />

            <h3 className="mt-4 font-semibold">
              No hay vuelos registrados
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Crea un vuelo para comenzar a visualizar las
              operaciones.
            </p>

            <Button asChild className="mt-5">
              <Link to="/private/operaciones/vuelos">
                Gestionar vuelos
              </Link>
            </Button>
          </div>
        )}
      </section>
    </div>
  )
}

interface StatisticCardProps {
  icon: ReactNode
  title: string
  value: number
  isLoading: boolean
  link: string
}

function StatisticCard({
  icon,
  title,
  value,
  isLoading,
  link,
}: StatisticCardProps) {
  return (
    <Link
      to={link}
      className="group rounded-2xl border bg-card p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="rounded-xl bg-primary/10 p-3 text-primary">
          {icon}
        </div>

        <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
      </div>

      <p className="mt-5 text-sm text-muted-foreground">
        {title}
      </p>

      {isLoading ? (
        <div className="mt-2 h-9 w-16 animate-pulse rounded-lg bg-muted" />
      ) : (
        <p className="mt-1 text-3xl font-bold">
          {value}
        </p>
      )}
    </Link>
  )
}

interface OperationCardProps {
  title: string
  value: number | string
  description: string
  icon: ReactNode
  type: 'normal' | 'success' | 'warning'
}

function OperationCard({
  title,
  value,
  description,
  icon,
  type,
}: OperationCardProps) {
  const styles = {
    normal: {
      container: 'border-border bg-card',
      icon: 'bg-primary/10 text-primary',
      value: 'text-foreground',
    },
    success: {
      container:
        'border-emerald-500/20 bg-emerald-500/5',
      icon: 'bg-emerald-500/10 text-emerald-700',
      value: 'text-emerald-700',
    },
    warning: {
      container:
        'border-amber-500/20 bg-amber-500/5',
      icon: 'bg-amber-500/10 text-amber-700',
      value: 'text-amber-700',
    },
  }

  const currentStyle = styles[type]

  return (
    <div
      className={`rounded-2xl border p-5 shadow-sm ${currentStyle.container}`}
    >
      <div
        className={`w-fit rounded-xl p-3 ${currentStyle.icon}`}
      >
        {icon}
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        {title}
      </p>

      <p
        className={`mt-1 text-3xl font-bold ${currentStyle.value}`}
      >
        {value}
      </p>

      <p className="mt-2 text-xs text-muted-foreground">
        {description}
      </p>
    </div>
  )
}

function ModuleCard({
  title,
  description,
  path,
  category,
  icon,
  count,
}: ModuleItem) {
  return (
    <Link
      to={path}
      className="group flex min-h-44 flex-col rounded-2xl border bg-card p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="rounded-xl bg-primary/10 p-3 text-primary">
          {icon}
        </div>

        {typeof count === 'number' && (
          <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
            {count}{' '}
            {count === 1 ? 'registro' : 'registros'}
          </span>
        )}
      </div>

      <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-primary">
        {category}
      </p>

      <h3 className="mt-1 text-lg font-bold">
        {title}
      </h3>

      <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">
        {description}
      </p>

      <div className="mt-5 flex items-center text-sm font-semibold text-primary">
        Abrir módulo

        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  )
}

interface TableHeaderProps {
  children: ReactNode
  align?: 'left' | 'right'
}

function TableHeader({
  children,
  align = 'left',
}: TableHeaderProps) {
  return (
    <th
      className={[
        'px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground',
        align === 'right'
          ? 'text-right'
          : 'text-left',
      ].join(' ')}
    >
      {children}
    </th>
  )
}

function formatDate(date: string) {
  return new Date(
    `${date}T00:00:00`,
  ).toLocaleDateString('es-EC', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function formatRole(role: string | null | undefined) {
  if (!role) {
    return 'Acceso administrativo'
  }

  return role
    .replaceAll('_', ' ')
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase(),
    )
}

function capitalize(value: string) {
  if (!value) return ''

  return (
    value.charAt(0).toUpperCase() +
    value.slice(1)
  )
}

function getStatusClass(status: string) {
  const normalizedStatus = status.toLowerCase()

  if (normalizedStatus.includes('cancelado')) {
    return 'bg-destructive/10 text-destructive'
  }

  if (
    normalizedStatus.includes('retrasado') ||
    normalizedStatus.includes('demorado')
  ) {
    return 'bg-amber-500/10 text-amber-700'
  }

  if (
    normalizedStatus.includes('completado') ||
    normalizedStatus.includes('aterrizado') ||
    normalizedStatus.includes('finalizado')
  ) {
    return 'bg-emerald-500/10 text-emerald-700'
  }

  if (
    normalizedStatus.includes('vuelo') ||
    normalizedStatus.includes('despegado')
  ) {
    return 'bg-sky-500/10 text-sky-700'
  }

  return 'bg-primary/10 text-primary'
}