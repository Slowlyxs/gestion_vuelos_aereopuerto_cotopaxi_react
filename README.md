# Sistema de Gestión de Vuelos — Cotopaxi Airlines

Aplicación web desarrollada con React, TypeScript y Vite para la gestión administrativa y consulta pública de información aeroportuaria.

El sistema permite administrar aeropuertos, aerolíneas, aviones, vuelos, terminales, puertas de embarque, rutas, horarios, empleados, pilotos, pistas, mantenimientos, incidentes, controles de tráfico y otros módulos relacionados con las operaciones de un aeropuerto.

---

## Tecnologías utilizadas

- React
- TypeScript
- Vite
- React Router
- Zustand
- Axios
- Tailwind CSS
- shadcn/ui
- Lucide React
- React Hook Form
- Zod
- Django REST Framework en el backend
- JWT para autenticación

---

## Funcionalidades principales

### Sitio público

- Página principal.
- Consulta de vuelos.
- Visualización del detalle de un vuelo.
- Listado de aerolíneas.
- Información general.
- Formulario de contacto.
- Inicio de sesión.

### Panel administrativo

- Dashboard con estadísticas generales.
- Listado de registros consumiendo una API REST.
- Creación de registros.
- Actualización de registros.
- Eliminación de registros.
- Buscadores y filtros.
- Gestión de usuarios autenticados.
- Protección de rutas privadas.
- Control de acceso según permisos.
- Diseño responsive para computadoras y dispositivos móviles.

---

# Requisitos

Antes de instalar el proyecto se necesita lo siguiente:

- Node.js 20 o superior.
- npm.
- Git.
- Navegador web actualizado.
- Acceso a la API de Cotopaxi Airlines.
- Conexión a Internet.

Para verificar las versiones instaladas:

```bash
node --version
npm --version
git --version
```

---

# Instalación

## 1. Clonar el repositorio

```bash
git clone https://github.com/Slowlyxs/gestion_vuelos_aereopuerto_cotopaxi_react.git
```

## 2. Ingresar al proyecto

```bash
cd gestion_vuelos_aereopuerto_cotopaxi_react
```

## 3. Instalar las dependencias

```bash
npm install
```

También se puede utilizar:

```bash
npm ci
```

`npm ci` es recomendable cuando ya existe el archivo `package-lock.json`, especialmente en servidores o procesos de integración continua.

---

# Variables de entorno

En la raíz del proyecto se debe crear un archivo llamado:

```text
.env
```

Contenido del archivo:

```env
VITE_API_BASE_URL=http://cotopaxi-airlines-api.uaeftt-ute.site/api
```

La estructura del proyecto debe quedar similar a la siguiente:

```text
gestion_vuelos_aereopuerto_cotopaxi_react/
├── src/
├── public/
├── .env
├── package.json
├── package-lock.json
├── vite.config.ts
└── README.md
```

> Las variables utilizadas en proyectos Vite deben comenzar con el prefijo `VITE_`.

No se recomienda subir el archivo `.env` a un repositorio público cuando contiene información privada.

En el archivo `.gitignore` debe encontrarse:

```gitignore
.env
.env.local
.env.production
```

---

# Conexión con la API

La aplicación utiliza Axios para conectarse con el backend.

La URL base se obtiene desde la variable:

```ts
import.meta.env.VITE_API_BASE_URL
```

Ejemplo de configuración:

```ts
export const API_CONFIG = {
  BASE_URL:
    import.meta.env.VITE_API_BASE_URL ??
    'http://cotopaxi-airlines-api.uaeftt-ute.site/api',

  TIMEOUT: 10_000,
} as const
```

Ejemplo del cliente Axios:

```ts
import axios from 'axios'

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10_000,
  headers: {
    Accept: 'application/json',
  },
})
```

Después de configurar la URL base, los servicios pueden realizar peticiones utilizando solamente la ruta del recurso.

Ejemplo:

```ts
const response = await apiClient.get('/aeropuertos/')
```

La petición completa se enviará a:

```text
http://cotopaxi-airlines-api.uaeftt-ute.site/api/aeropuertos/
```

---

# Documentación de la API

La API cuenta con documentación interactiva disponible en:

```text
http://cotopaxi-airlines-api.uaeftt-ute.site/api/docs/
```

Esquema de la API:

```text
http://cotopaxi-airlines-api.uaeftt-ute.site/api/schema/
```

Desde la documentación se pueden revisar:

- Métodos disponibles.
- Campos requeridos.
- Estructura de las respuestas.
- Parámetros de cada endpoint.
- Operaciones GET, POST, PATCH y DELETE.
- Requisitos de autenticación.

---

# Endpoints principales

Algunos de los endpoints utilizados por el frontend son:

```text
/api/aeropuertos/
/api/aerolineas/
/api/aviones/
/api/mantenimientos/
/api/terminales/
/api/puertas-embarque/
/api/vuelos/
/api/rutas/
/api/horarios/
/api/escalas/
/api/incidentes/
/api/controles-trafico/
/api/empleados/
/api/pilotos/
/api/pistas/
/api/asignacion-pista/
/api/asignacion-tripulacion/
/api/autorizaciones-vuelo/
/api/registros-vuelo/
/api/historial-estados-vuelo/
/api/torres-control/
/api/tipos-avion/
```

Ejemplo de consumo de un listado:

```ts
export const airportService = {
  async getAll() {
    const response = await apiClient.get('/aeropuertos/')

    const data = response.data

    return Array.isArray(data)
      ? data
      : data.results ?? []
  },
}
```

La API puede devolver respuestas paginadas:

```json
{
  "count": 10,
  "next": null,
  "previous": null,
  "results": [
    {
      "id_aeropuerto": 1,
      "nombre": "Aeropuerto Internacional Mariscal Sucre",
      "ciudad": "Quito",
      "pais": "Ecuador",
      "codigo_iata": "UIO"
    }
  ]
}
```

Por este motivo, los servicios obtienen los registros desde la propiedad `results`.

---

# Autenticación

El sistema utiliza autenticación mediante JSON Web Token.

Después de iniciar sesión, el backend devuelve un token de acceso y, dependiendo de su configuración, un token de actualización.

Las peticiones privadas deben enviar el token en la cabecera:

```text
Authorization: Bearer TOKEN_DE_ACCESO
```

Ejemplo de interceptor:

```ts
apiClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('access_token')

  if (accessToken) {
    config.headers.Authorization =
      `Bearer ${accessToken}`
  }

  return config
})
```

Las rutas administrativas están protegidas y solamente pueden ser utilizadas por usuarios autenticados con los permisos correspondientes.

---

# Credenciales de prueba

Para ingresar al panel administrativo se pueden utilizar las siguientes credenciales:

```text
Usuario: admin
Contraseña: Admin1234!
```

> Estas credenciales deben utilizarse únicamente para pruebas académicas o demostraciones. En un entorno de producción deben reemplazarse por credenciales seguras.

---

# Comandos disponibles

## Ejecutar el proyecto en desarrollo

```bash
npm run dev
```

La aplicación normalmente estará disponible en:

```text
http://localhost:5173
```

## Generar la versión de producción

```bash
npm run build
```

Los archivos compilados se guardarán en:

```text
dist/
```

## Previsualizar la compilación de producción

```bash
npm run preview
```

## Revisar errores de código

```bash
npm run lint
```

## Instalar dependencias

```bash
npm install
```

## Actualizar dependencias

```bash
npm update
```

---

# Ejecución rápida

Después de clonar el repositorio:

```bash
git clone https://github.com/Slowlyxs/gestion_vuelos_aereopuerto_cotopaxi_react.git
cd gestion_vuelos_aereopuerto_cotopaxi_react
npm install
```

Crear el archivo `.env`:

```env
VITE_API_BASE_URL=http://cotopaxi-airlines-api.uaeftt-ute.site/api
```

Ejecutar:

```bash
npm run dev
```

Abrir en el navegador:

```text
http://localhost:5173
```

Iniciar sesión con:

```text
Usuario: admin
Contraseña: Admin1234!
```

---

# Estructura principal del proyecto

```text
src/
├── application/
│   ├── dtos/
│   └── use-cases/
│
├── domain/
│   ├── entities/
│   ├── enums/
│   ├── exceptions/
│   └── services/
│
├── infrastructure/
│   ├── adapters/
│   ├── config/
│   ├── factories/
│   ├── http/
│   └── storage/
│
└── presentation/
    ├── components/
    ├── pages/
    │   ├── public/
    │   └── private/
    │       ├── dashboard/
    │       ├── infrastructure/
    │       ├── operations/
    │       ├── staff/
    │       └── traffic-control/
    ├── router/
    ├── store/
    ├── theme/
    └── utils/
```

---

# Arquitectura

El proyecto aplica una separación de responsabilidades inspirada en arquitectura limpia.

El flujo general es:

```text
Página o componente
        ↓
Store de Zustand
        ↓
Factory
        ↓
Caso de uso
        ↓
Servicio
        ↓
Cliente Axios
        ↓
API REST
```

Ejemplo:

```text
AirportsPage
      ↓
useAirportStore
      ↓
airportFactory
      ↓
getAirportsUseCase
      ↓
airportService
      ↓
GET /api/aeropuertos/
```

Esta organización evita que las páginas se conecten directamente con el backend y facilita el mantenimiento del proyecto.

---

# Operaciones CRUD

Los módulos administrativos utilizan las siguientes operaciones:

```text
GET     /recurso/       Listar registros
POST    /recurso/       Crear un registro
PATCH   /recurso/{id}/  Actualizar un registro
DELETE  /recurso/{id}/  Eliminar un registro
```

Ejemplo con aeropuertos:

```text
GET     /api/aeropuertos/
POST    /api/aeropuertos/
PATCH   /api/aeropuertos/1/
DELETE  /api/aeropuertos/1/
```

---

# Solución de problemas

## Error de conexión con la API

Verificar que el archivo `.env` contenga:

```env
VITE_API_BASE_URL=http://cotopaxi-airlines-api.uaeftt-ute.site/api
```

Después de modificar el archivo `.env`, se debe reiniciar Vite:

```bash
npm run dev
```

---

## Error de CORS

Ejemplo:

```text
No 'Access-Control-Allow-Origin' header is present
```

Este error debe solucionarse en el backend permitiendo el origen del frontend.

Durante desarrollo se debe permitir:

```text
http://localhost:5173
```

En producción se debe permitir el dominio donde esté desplegada la aplicación React.

Ejemplo de configuración en Django:

```py
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "https://dominio-del-frontend.com",
]
```

---

## Error 401 Unauthorized

Posibles causas:

- El usuario no ha iniciado sesión.
- El token expiró.
- El token no está siendo enviado.
- Las credenciales son incorrectas.
- El usuario no tiene permisos administrativos.

Se debe cerrar sesión, volver a ingresar y verificar que la petición contenga:

```text
Authorization: Bearer TOKEN
```

---

## Error 404 Not Found

Verificar:

- La URL base de la API.
- El nombre exacto del endpoint.
- La barra `/` al final de la ruta.
- Que el recurso exista en el backend.

Ejemplo correcto:

```text
/aeropuertos/
```

Ejemplo posiblemente incorrecto:

```text
/aeropuerto
```

---

## Error al mostrar listados

La API utiliza paginación. Por tanto, no siempre devuelve directamente un arreglo.

Se debe manejar la respuesta de esta forma:

```ts
const data = response.data

return Array.isArray(data)
  ? data
  : data.results ?? []
```

---

## Error de contenido mixto

Si el frontend está desplegado con HTTPS y la API utiliza HTTP, el navegador puede bloquear las peticiones.

En producción se recomienda que tanto el frontend como la API utilicen HTTPS.

```text
Frontend: https://
API:      https://
```

---

# Construcción para producción

Generar la compilación:

```bash
npm run build
```

El resultado se encontrará en:

```text
dist/
```

El contenido de esta carpeta puede servirse utilizando Nginx, Apache, Azure Static Web Apps, Netlify, Vercel u otro servicio compatible con aplicaciones estáticas.

Para React Router, el servidor debe redirigir las rutas desconocidas a `index.html`.

Ejemplo de configuración básica en Nginx:

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

---

---
Proyecto académico de gestión de vuelos y operaciones aeroportuarias.

Universidad UTE — Desarrollo de Software.
