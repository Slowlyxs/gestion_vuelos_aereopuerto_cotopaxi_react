import {
  useEffect,
  useMemo,
  useState,
  type FormEvent,
  type ReactNode,
} from 'react'

import {
  CalendarDays,
  Clock3,
  Pencil,
  Plane,
  RadioTower,
  Search,
  ShieldCheck,
  Trash2,
} from 'lucide-react'

import type { TrafficControl } from '@/domain/entities/traffic-control.entity'

import { useFlightStore } from '@/presentation/store/flight.store'
import { useTrafficControlStore } from '@/presentation/store/traffic-control.store'

import CrudModal from '@/presentation/components/private/crud/CrudModal'
import CrudPageHeader from '@/presentation/components/private/crud/CrudPageHeader'
import CrudTableState from '@/presentation/components/private/crud/CrudTableState'
import DeleteConfirmModal from '@/presentation/components/private/crud/DeleteConfirmModal'

import { Button } from '@/presentation/components/ui/button'
import { Input } from '@/presentation/components/ui/input'
import { Label } from '@/presentation/components/ui/label'

interface TrafficControlForm {
  autorizacion: string
  hora: string
  id_vuelo: string
}

const initialForm: TrafficControlForm = {
  autorizacion: '',
  hora: '',
  id_vuelo: '',
}

export default function TrafficControlPage() {
  const {
    trafficControls,
    isLoading,
    isSaving,
    deletingId,
    error,
    loadTrafficControls,
    createTrafficControl,
    updateTrafficControl,
    deleteTrafficControl,
    clearError,
  } = useTrafficControlStore()

  const {
    flights,
    isLoading: flightsLoading,
    loadFlights,
  } = useFlightStore()

  const [search, setSearch] = useState('')

  const [isFormOpen, setIsFormOpen] =
    useState(false)

  const [editingControl, setEditingControl] =
    useState<TrafficControl | null>(null)

  const [controlToDelete, setControlToDelete] =
    useState<TrafficControl | null>(null)

  const [form, setForm] =
    useState<TrafficControlForm>(initialForm)

  useEffect(() => {
    loadTrafficControls()
    loadFlights()
  }, [loadTrafficControls, loadFlights])

  const filteredControls = useMemo(() => {
    const normalizedSearch =
      search.trim().toLowerCase()

    if (!normalizedSearch) {
      return trafficControls
    }

    return trafficControls.filter((control) => {
      return (
        control.autorizacion
          .toLowerCase()
          .includes(normalizedSearch) ||
        control.hora
          .toLowerCase()
          .includes(normalizedSearch) ||
        control.id_vuelo.codigo_vuelo
          .toLowerCase()
          .includes(normalizedSearch) ||
        control.id_vuelo.estado
          .toLowerCase()
          .includes(normalizedSearch) ||
        control.id_vuelo.fecha.includes(
          normalizedSearch,
        )
      )
    })
  }, [trafficControls, search])

  function openCreateForm() {
    clearError()
    setEditingControl(null)
    setForm(initialForm)
    setIsFormOpen(true)
  }

  function openEditForm(
    control: TrafficControl,
  ) {
    clearError()
    setEditingControl(control)

    setForm({
      autorizacion: control.autorizacion,
      hora: normalizeTimeForInput(control.hora),
      id_vuelo: String(control.id_vuelo.id),
    })

    setIsFormOpen(true)
  }

  function closeForm() {
    if (isSaving) return

    setIsFormOpen(false)
    setEditingControl(null)
    setForm(initialForm)
    clearError()
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

    const autorizacion =
      form.autorizacion.trim()

    const flightId = Number(form.id_vuelo)

    if (
      !autorizacion ||
      !form.hora ||
      !Number.isInteger(flightId) ||
      flightId <= 0
    ) {
      return
    }

    const payload = {
      autorizacion,
      hora: form.hora,
      id_vuelo: flightId,
    }

    try {
      if (editingControl) {
        await updateTrafficControl(
          editingControl.id,
          payload,
        )
      } else {
        await createTrafficControl(payload)
      }

      closeForm()
    } catch {
      // El store ya muestra el error.
    }
  }

  async function handleDelete() {
    if (!controlToDelete) return

    try {
      await deleteTrafficControl(
        controlToDelete.id,
      )

      setControlToDelete(null)
    } catch {
      // El store ya muestra el error.
    }
  }

  const hasSearch =
    search.trim().length > 0

  return (
    <div className="space-y-6">
      <CrudPageHeader
        title="Control de tráfico"
        description="Gestiona las autorizaciones y horas operativas de cada vuelo."
        icon={<RadioTower className="h-5 w-5" />}
        buttonLabel="Nuevo control"
        onCreate={openCreateForm}
      />

      {/* Resumen y búsqueda */}
      <div className="grid gap-4 md:grid-cols-[220px_1fr]">
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <p className="text-sm text-muted-foreground">
            Total de controles
          </p>

          <p className="mt-1 text-3xl font-bold">
            {trafficControls.length}
          </p>
        </div>

        <div className="flex items-center rounded-xl border bg-card p-5 shadow-sm">
          <div className="relative w-full">
            <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

            <Input
              type="search"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Buscar por vuelo, autorización, estado, fecha u hora..."
              className="pl-9"
            />
          </div>
        </div>
      </div>

      {error && trafficControls.length > 0 && (
        <div className="rounded-lg border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <CrudTableState
        isLoading={isLoading}
        error={
          trafficControls.length === 0
            ? error
            : null
        }
        isEmpty={
          filteredControls.length === 0
        }
        loadingMessage="Cargando controles de tráfico..."
        emptyTitle={
          hasSearch
            ? 'No encontramos controles'
            : 'No hay controles registrados'
        }
        emptyDescription={
          hasSearch
            ? 'Prueba utilizando otro código, estado, fecha, hora o autorización.'
            : 'Crea el primer control de tráfico para comenzar.'
        }
        emptyIcon={
          <RadioTower className="h-8 w-8" />
        }
        createLabel="Nuevo control"
        onCreate={openCreateForm}
        onRetry={loadTrafficControls}
      >
        <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px]">
              <thead className="border-b bg-muted/50">
                <tr>
                  <TableHeader>ID</TableHeader>
                  <TableHeader>Vuelo</TableHeader>
                  <TableHeader>Fecha</TableHeader>
                  <TableHeader>Hora</TableHeader>
                  <TableHeader>
                    Autorización
                  </TableHeader>
                  <TableHeader>Estado</TableHeader>

                  <TableHeader align="right">
                    Acciones
                  </TableHeader>
                </tr>
              </thead>

              <tbody className="divide-y">
                {filteredControls.map((control) => (
                  <tr
                    key={control.id}
                    className="transition-colors hover:bg-muted/30"
                  >
                    <td className="px-5 py-4 text-sm font-medium">
                      #{control.id}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-primary/10 p-2 text-primary">
                          <Plane className="h-4 w-4" />
                        </div>

                        <div>
                          <p className="font-semibold">
                            {
                              control.id_vuelo
                                .codigo_vuelo
                            }
                          </p>

                          <p className="mt-1 text-xs text-muted-foreground">
                            Vuelo #
                            {control.id_vuelo.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-sm">
                        <CalendarDays className="h-4 w-4 text-primary" />

                        {formatDate(
                          control.id_vuelo.fecha,
                        )}
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <Clock3 className="h-4 w-4 text-primary" />

                        {formatTime(control.hora)}
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex max-w-sm items-start gap-2">
                        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />

                        <span className="text-sm">
                          {control.autorizacion}
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                          control.id_vuelo.estado,
                        )}`}
                      >
                        {capitalize(
                          control.id_vuelo.estado,
                        )}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          aria-label="Editar control"
                          onClick={() =>
                            openEditForm(control)
                          }
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>

                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          aria-label="Eliminar control"
                          className="text-destructive hover:border-destructive/30 hover:bg-destructive/10 hover:text-destructive"
                          onClick={() =>
                            setControlToDelete(
                              control,
                            )
                          }
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CrudTableState>

      {/* Crear y editar */}
      <CrudModal
        open={isFormOpen}
        title={
          editingControl
            ? 'Editar control de tráfico'
            : 'Nuevo control de tráfico'
        }
        description={
          editingControl
            ? 'Actualiza la autorización, hora o vuelo relacionado.'
            : 'Registra una autorización para un vuelo.'
        }
        isSaving={isSaving}
        submitLabel={
          editingControl
            ? 'Guardar cambios'
            : 'Crear control'
        }
        onClose={closeForm}
        onSubmit={handleSubmit}
      >
        {error && (
          <div className="rounded-lg border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="traffic-flight">
            Vuelo
          </Label>

          <select
            id="traffic-flight"
            required
            disabled={flightsLoading}
            value={form.id_vuelo}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                id_vuelo: event.target.value,
              }))
            }
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none transition focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">
              {flightsLoading
                ? 'Cargando vuelos...'
                : 'Selecciona un vuelo'}
            </option>

            {flights.map((flight) => (
              <option
                key={flight.id}
                value={flight.id}
              >
                {flight.codigo_vuelo} —{' '}
                {flight.fecha} —{' '}
                {flight.estado}
              </option>
            ))}
          </select>

          {!flightsLoading &&
            flights.length === 0 && (
              <p className="text-xs text-destructive">
                Primero debes registrar un vuelo.
              </p>
            )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="traffic-time">
            Hora
          </Label>

          <Input
            id="traffic-time"
            type="time"
            required
            value={form.hora}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                hora: event.target.value,
              }))
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="traffic-authorization">
            Autorización
          </Label>

          <textarea
            id="traffic-authorization"
            required
            rows={4}
            maxLength={500}
            value={form.autorizacion}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                autorizacion:
                  event.target.value,
              }))
            }
            placeholder="Ejemplo: Autorizado para despegar por la pista 01..."
            className="flex min-h-28 w-full resize-y rounded-md border border-input bg-background px-3 py-2 text-sm outline-none transition placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
          />

          <p className="text-right text-xs text-muted-foreground">
            {form.autorizacion.length}/500
          </p>
        </div>
      </CrudModal>

      {/* Eliminar */}
      <DeleteConfirmModal
        open={controlToDelete !== null}
        title="Eliminar control de tráfico"
        description={
          controlToDelete
            ? `Se eliminará el control #${controlToDelete.id} correspondiente al vuelo ${controlToDelete.id_vuelo.codigo_vuelo}. Esta acción no se puede deshacer.`
            : ''
        }
        isDeleting={deletingId !== null}
        onCancel={() => {
          if (deletingId === null) {
            setControlToDelete(null)
          }
        }}
        onConfirm={handleDelete}
      />
    </div>
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
        'px-5 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground',
        align === 'right'
          ? 'text-right'
          : 'text-left',
      ].join(' ')}
    >
      {children}
    </th>
  )
}

function normalizeTimeForInput(time: string) {
  if (!time) return ''

  return time.slice(0, 5)
}

function formatTime(time: string) {
  if (!time) return 'Sin hora'

  return time.slice(0, 5)
}

function formatDate(date: string) {
  return new Date(
    `${date}T00:00:00`,
  ).toLocaleDateString('es-EC')
}

function capitalize(value: string) {
  if (!value) return ''

  return (
    value.charAt(0).toUpperCase() +
    value.slice(1)
  )
}

function getStatusClass(status: string) {
  const normalizedStatus =
    status.toLowerCase()

  if (
    normalizedStatus.includes('cancelado') ||
    normalizedStatus.includes('cancelled')
  ) {
    return 'bg-destructive/10 text-destructive'
  }

  if (
    normalizedStatus.includes('completado') ||
    normalizedStatus.includes('finalizado') ||
    normalizedStatus.includes('aterrizado')
  ) {
    return 'bg-emerald-500/10 text-emerald-700'
  }

  if (
    normalizedStatus.includes('retrasado') ||
    normalizedStatus.includes('demorado')
  ) {
    return 'bg-amber-500/10 text-amber-700'
  }

  if (
    normalizedStatus.includes('vuelo') ||
    normalizedStatus.includes('despegado')
  ) {
    return 'bg-sky-500/10 text-sky-700'
  }

  return 'bg-primary/10 text-primary'
}