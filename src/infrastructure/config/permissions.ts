// src/infrastructure/config/permissions.ts

export type Role = 'CONTROLADOR' | 'TECNICO' | 'RRHH' | 'OPERADOR_VUELO'

interface AccessUser {
  is_staff: boolean
  role: string | null
}

const ROLE_ROUTES: Record<Role, string[]> = {
  CONTROLADOR: [
    '/private/operaciones/control-trafico',
    '/private/personal/pistas',
    '/private/personal/asignacion-pista',
    '/private/operaciones/autorizaciones-vuelo',
    '/private/operaciones/vuelos',
    '/private/operaciones/estado-vuelo',
    '/private/operaciones/historial-estados-vuelo',
  ],
  TECNICO: [
    '/private/infraestructura/aviones',
    '/private/infraestructura/mantenimientos',
    '/private/operaciones/incidentes',
  ],
  RRHH: [
    '/private/personal/empleados',
    '/private/personal/pilotos',
    '/private/personal/tripulacion',
    '/private/personal/asignacion-tripulacion',
  ],
  OPERADOR_VUELO: [
    '/private/operaciones/vuelos',
    '/private/infraestructura/aerolineas',
    '/private/operaciones/rutas',
    '/private/operaciones/escalas',
    '/private/operaciones/horarios',
    '/private/operaciones/estado-vuelo',
    '/private/operaciones/historial-estados-vuelo',
    '/private/operaciones/Clima',
    '/private/infraestructura/aeropuertos',
    '/private/infraestructura/terminales',
    '/private/infraestructura/puertas-embarque',
  ],
}

const COMMON_ROUTES = [
  '/private/dashboard',
]

const VALID_ROLES = Object.keys(ROLE_ROUTES) as Role[]

/**
 * true si el usuario tiene algún tipo de acceso administrativo:
 * es staff, o tiene uno de los 4 roles operativos válidos.
 * Un cliente normal (role: null o cualquier valor fuera de la lista) → false.
 */
export function hasPrivilegedAccess(user: AccessUser | null): boolean {
  if (!user) return false
  if (user.is_staff) return true
  return VALID_ROLES.includes(user.role as Role)
}

export function canAccess(user: AccessUser, location: string): boolean {
  if (user.is_staff) return true

  if (!hasPrivilegedAccess(user)) return false

  const roleRoutes = ROLE_ROUTES[user.role as Role] ?? []
  const allowed = [...COMMON_ROUTES, ...roleRoutes]

  return allowed.some((p) => location === p || location.startsWith(`${p}/`))
}

export function canSeeModule(user: AccessUser, moduleRoute: string): boolean {
  if (user.is_staff) return true

  const roleRoutes = ROLE_ROUTES[user.role as Role] ?? []
  return roleRoutes.some((p) => moduleRoute === p || moduleRoute.startsWith(`${p}/`))
}