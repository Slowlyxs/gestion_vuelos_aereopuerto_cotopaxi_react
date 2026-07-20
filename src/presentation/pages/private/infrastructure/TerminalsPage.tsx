import {
  useEffect,
  useMemo,
  useState,
  type FormEvent,
  type ReactNode,
} from 'react'

import {
  Building2,
  MapPin,
  Pencil,
  Search,
  Trash2,
} from 'lucide-react'

import type { Terminal } from '@/domain/entities/terminal.entity'

import { useAirportStore } from '@/presentation/store/airport.store'
import { useTerminalStore } from '@/presentation/store/terminal.store'

import CrudModal from '@/presentation/components/private/crud/CrudModal'
import CrudPageHeader from '@/presentation/components/private/crud/CrudPageHeader'
import CrudTableState from '@/presentation/components/private/crud/CrudTableState'
import DeleteConfirmModal from '@/presentation/components/private/crud/DeleteConfirmModal'

import { Button } from '@/presentation/components/ui/button'
import { Input } from '@/presentation/components/ui/input'
import { Label } from '@/presentation/components/ui/label'

interface TerminalForm {
  numero: string
  id_aeropuerto: string
}

const initialForm: TerminalForm = {
  numero: '',
  id_aeropuerto: '',
}

export default function TerminalsPage() {
  const {
    terminals,
    isLoading,
    isSaving,
    deletingId,
    error,
    loadTerminals,
    createTerminal,
    updateTerminal,
    deleteTerminal,
    clearError,
  } = useTerminalStore()

  const {
    airports,
    isLoading: airportsLoading,
    loadAirports,
  } = useAirportStore()

  const [search, setSearch] = useState('')
  const [isFormOpen, setIsFormOpen] =
    useState(false)

  const [editingTerminal, setEditingTerminal] =
    useState<Terminal | null>(null)

  const [terminalToDelete, setTerminalToDelete] =
    useState<Terminal | null>(null)

  const [form, setForm] =
    useState<TerminalForm>(initialForm)

  useEffect(() => {
    loadTerminals()
    loadAirports()
  }, [loadTerminals, loadAirports])

  const airportsById = useMemo(() => {
    return new Map(
      airports.map((airport) => [
        airport.id_aeropuerto,
        airport,
      ]),
    )
  }, [airports])

  const filteredTerminals = useMemo(() => {
    const normalizedSearch =
      search.trim().toLowerCase()

    if (!normalizedSearch) {
      return terminals
    }

    return terminals.filter((terminal) => {
      const airport = airportsById.get(
        terminal.id_aeropuerto,
      )

      return (
        String(terminal.id_terminal).includes(
          normalizedSearch,
        ) ||
        String(terminal.numero).includes(
          normalizedSearch,
        ) ||
        airport?.nombre
          .toLowerCase()
          .includes(normalizedSearch) ||
        airport?.ciudad
          .toLowerCase()
          .includes(normalizedSearch) ||
        airport?.codigo_iata
          .toLowerCase()
          .includes(normalizedSearch)
      )
    })
  }, [
    terminals,
    search,
    airportsById,
  ])

  function openCreateForm() {
    clearError()
    setEditingTerminal(null)
    setForm(initialForm)
    setIsFormOpen(true)
  }

  function openEditForm(terminal: Terminal) {
    clearError()
    setEditingTerminal(terminal)

    setForm({
      numero: String(terminal.numero),
      id_aeropuerto: String(
        terminal.id_aeropuerto,
      ),
    })

    setIsFormOpen(true)
  }

  function closeForm() {
    if (isSaving) return

    setIsFormOpen(false)
    setEditingTerminal(null)
    setForm(initialForm)
    clearError()
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

    const numero = Number(form.numero)
    const airportId = Number(
      form.id_aeropuerto,
    )

    if (
      !Number.isInteger(numero) ||
      numero <= 0 ||
      !Number.isInteger(airportId) ||
      airportId <= 0
    ) {
      return
    }

    const payload = {
      numero,
      id_aeropuerto: airportId,
    }

    try {
      if (editingTerminal) {
        await updateTerminal(
          editingTerminal.id_terminal,
          payload,
        )
      } else {
        await createTerminal(payload)
      }

      closeForm()
    } catch {
      // El store ya contiene el mensaje.
    }
  }

  async function handleDelete() {
    if (!terminalToDelete) return

    try {
      await deleteTerminal(
        terminalToDelete.id_terminal,
      )

      setTerminalToDelete(null)
    } catch {
      // El store ya contiene el mensaje.
    }
  }

  const hasSearch =
    search.trim().length > 0

  function getAirportName(id: number) {
    const airport = airportsById.get(id)

    if (!airport) {
      return `Aeropuerto #${id}`
    }

    return `${airport.nombre} (${airport.codigo_iata})`
  }

  return (
    <div className="space-y-6">
      <CrudPageHeader
        title="Terminales"
        description="Gestiona las terminales pertenecientes a cada aeropuerto."
        icon={<Building2 className="h-5 w-5" />}
        buttonLabel="Nueva terminal"
        onCreate={openCreateForm}
      />

      {/* Total y búsqueda */}
      <div className="grid gap-4 md:grid-cols-[220px_1fr]">
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <p className="text-sm text-muted-foreground">
            Total de terminales
          </p>

          <p className="mt-1 text-3xl font-bold">
            {terminals.length}
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
              placeholder="Buscar por terminal, aeropuerto, ciudad o código..."
              className="pl-9"
            />
          </div>
        </div>
      </div>

      {error && terminals.length > 0 && (
        <div className="rounded-lg border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <CrudTableState
        isLoading={isLoading}
        error={
          terminals.length === 0
            ? error
            : null
        }
        isEmpty={
          filteredTerminals.length === 0
        }
        loadingMessage="Cargando terminales..."
        emptyTitle={
          hasSearch
            ? 'No encontramos terminales'
            : 'No hay terminales registradas'
        }
        emptyDescription={
          hasSearch
            ? 'Prueba utilizando otro número, aeropuerto, ciudad o código.'
            : 'Crea la primera terminal y asígnala a un aeropuerto.'
        }
        emptyIcon={
          <Building2 className="h-8 w-8" />
        }
        createLabel="Nueva terminal"
        onCreate={openCreateForm}
        onRetry={loadTerminals}
      >
        <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[750px]">
              <thead className="border-b bg-muted/50">
                <tr>
                  <TableHeader>ID</TableHeader>

                  <TableHeader>
                    Terminal
                  </TableHeader>

                  <TableHeader>
                    Aeropuerto
                  </TableHeader>

                  <TableHeader>
                    Ciudad
                  </TableHeader>

                  <TableHeader align="right">
                    Acciones
                  </TableHeader>
                </tr>
              </thead>

              <tbody className="divide-y">
                {filteredTerminals.map(
                  (terminal) => {
                    const airport =
                      airportsById.get(
                        terminal.id_aeropuerto,
                      )

                    return (
                      <tr
                        key={terminal.id_terminal}
                        className="transition-colors hover:bg-muted/30"
                      >
                        <td className="px-5 py-4 text-sm font-medium">
                          #{terminal.id_terminal}
                        </td>

                        <td className="px-5 py-4">
                          <span className="inline-flex rounded-md bg-primary/10 px-3 py-1 text-sm font-bold text-primary">
                            Terminal {terminal.numero}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <p className="font-semibold">
                            {getAirportName(
                              terminal.id_aeropuerto,
                            )}
                          </p>

                          <p className="mt-1 text-xs text-muted-foreground">
                            ID de aeropuerto:{' '}
                            {terminal.id_aeropuerto}
                          </p>
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="h-4 w-4 text-primary" />

                            {airport?.ciudad ??
                              'Ciudad no disponible'}
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex justify-end gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              aria-label={`Editar terminal ${terminal.numero}`}
                              onClick={() =>
                                openEditForm(
                                  terminal,
                                )
                              }
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>

                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              aria-label={`Eliminar terminal ${terminal.numero}`}
                              className="text-destructive hover:border-destructive/30 hover:bg-destructive/10 hover:text-destructive"
                              onClick={() =>
                                setTerminalToDelete(
                                  terminal,
                                )
                              }
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    )
                  },
                )}
              </tbody>
            </table>
          </div>
        </div>
      </CrudTableState>

      {/* Formulario */}
      <CrudModal
        open={isFormOpen}
        title={
          editingTerminal
            ? 'Editar terminal'
            : 'Nueva terminal'
        }
        description={
          editingTerminal
            ? 'Actualiza el número o el aeropuerto de la terminal.'
            : 'Ingresa el número y selecciona el aeropuerto.'
        }
        isSaving={isSaving}
        submitLabel={
          editingTerminal
            ? 'Guardar cambios'
            : 'Crear terminal'
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
          <Label htmlFor="terminal-number">
            Número de terminal
          </Label>

          <Input
            id="terminal-number"
            type="number"
            min={1}
            step={1}
            required
            value={form.numero}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                numero: event.target.value,
              }))
            }
            placeholder="Ejemplo: 1"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="terminal-airport">
            Aeropuerto
          </Label>

          <select
            id="terminal-airport"
            required
            disabled={airportsLoading}
            value={form.id_aeropuerto}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                id_aeropuerto:
                  event.target.value,
              }))
            }
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none transition focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">
              {airportsLoading
                ? 'Cargando aeropuertos...'
                : 'Selecciona un aeropuerto'}
            </option>

            {airports.map((airport) => (
              <option
                key={airport.id_aeropuerto}
                value={airport.id_aeropuerto}
              >
                {airport.nombre} —{' '}
                {airport.ciudad} —{' '}
                {airport.codigo_iata}
              </option>
            ))}
          </select>

          {!airportsLoading &&
            airports.length === 0 && (
              <p className="text-xs text-destructive">
                Primero debes registrar un aeropuerto.
              </p>
            )}
        </div>
      </CrudModal>

      {/* Eliminar */}
      <DeleteConfirmModal
        open={terminalToDelete !== null}
        title="Eliminar terminal"
        description={
          terminalToDelete
            ? `Se eliminará la Terminal ${terminalToDelete.numero} del aeropuerto “${getAirportName(terminalToDelete.id_aeropuerto)}”. Puede fallar si tiene puertas de embarque relacionadas.`
            : ''
        }
        isDeleting={deletingId !== null}
        onCancel={() => {
          if (deletingId === null) {
            setTerminalToDelete(null)
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