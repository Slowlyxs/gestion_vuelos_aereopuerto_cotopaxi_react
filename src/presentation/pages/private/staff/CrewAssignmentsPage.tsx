import {
  useEffect,
  useMemo,
  useState,
  type FormEvent,
} from 'react'

import {
  Loader2,
  Pencil,
  Plus,
  Search,
  Trash2,
  Users,
  X,
} from 'lucide-react'

import type { CrewAssignment } from '@/domain/entities/crew-assignment.entity'

import { useCrewAssignmentStore } from '@/presentation/store/crew-assignment.store'
import { useFlightStore } from '@/presentation/store/flight.store'
import { useEmployeeStore } from '@/presentation/store/employee.store'

import { Button } from '@/presentation/components/ui/button'
import { Input } from '@/presentation/components/ui/input'
import { Label } from '@/presentation/components/ui/label'

interface AssignmentForm {
  id_vuelo: string
  id_empleado: string
}

const initialForm: AssignmentForm = {
  id_vuelo: '',
  id_empleado: '',
}

export default function CrewAssignmentsPage() {
  const {
    crewAssignments,
    isLoading,
    isSaving,
    deletingId,
    error,
    loadCrewAssignments,
    createCrewAssignment,
    updateCrewAssignment,
    deleteCrewAssignment,
    clearError,
  } = useCrewAssignmentStore()

  const {
    flights,
    loadFlights,
  } = useFlightStore()

  const {
    employees,
    loadEmployees,
  } = useEmployeeStore()

  const [search, setSearch] = useState('')

  const [isFormOpen, setIsFormOpen] =
    useState(false)

  const [editingAssignment, setEditingAssignment] =
    useState<CrewAssignment | null>(null)

  const [assignmentToDelete, setAssignmentToDelete] =
    useState<CrewAssignment | null>(null)

  const [form, setForm] =
    useState<AssignmentForm>(initialForm)

  useEffect(() => {
    loadCrewAssignments()
    loadFlights()
    loadEmployees()
  }, [
    loadCrewAssignments,
    loadFlights,
    loadEmployees,
  ])

  const filteredAssignments = useMemo(() => {
    const normalizedSearch =
      search.trim().toLowerCase()

    if (!normalizedSearch) {
      return crewAssignments
    }

    return crewAssignments.filter((assignment) => {
      const flight = assignment.id_vuelo
      const employee = assignment.id_empleado

      return (
        flight.codigo_vuelo
          .toLowerCase()
          .includes(normalizedSearch) ||
        flight.estado
          .toLowerCase()
          .includes(normalizedSearch) ||
        employee.nombre
          .toLowerCase()
          .includes(normalizedSearch) ||
        employee.cargo
          .toLowerCase()
          .includes(normalizedSearch)
      )
    })
  }, [crewAssignments, search])

  function openCreateForm() {
    clearError()
    setEditingAssignment(null)
    setForm(initialForm)
    setIsFormOpen(true)
  }

  function openEditForm(
    assignment: CrewAssignment,
  ) {
    clearError()

    setEditingAssignment(assignment)

    setForm({
      id_vuelo: String(assignment.id_vuelo.id),
      id_empleado: String(
        assignment.id_empleado.id,
      ),
    })

    setIsFormOpen(true)
  }

  function closeForm() {
    if (isSaving) return

    setIsFormOpen(false)
    setEditingAssignment(null)
    setForm(initialForm)
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

    const flightId = Number(form.id_vuelo)
    const employeeId = Number(form.id_empleado)

    if (
      Number.isNaN(flightId) ||
      Number.isNaN(employeeId)
    ) {
      return
    }

    const payload = {
      id_vuelo: flightId,
      id_empleado: employeeId,
    }

    try {
      if (editingAssignment) {
        await updateCrewAssignment(
          editingAssignment.id_asignacion,
          payload,
        )
      } else {
        await createCrewAssignment(payload)
      }

      closeForm()
    } catch {
      // El store ya establece el mensaje de error.
    }
  }

  async function handleDelete() {
    if (!assignmentToDelete) return

    try {
      await deleteCrewAssignment(
        assignmentToDelete.id_asignacion,
      )

      setAssignmentToDelete(null)
    } catch {
      // El store ya establece el mensaje de error.
    }
  }

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-primary/10 p-3 text-primary">
              <Users className="h-5 w-5" />
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                Asignaciones de tripulación
              </h1>

              <p className="mt-1 text-sm text-muted-foreground">
                Gestiona los empleados asignados a cada vuelo.
              </p>
            </div>
          </div>
        </div>

        <Button onClick={openCreateForm}>
          <Plus className="mr-2 h-4 w-4" />
          Nueva asignación
        </Button>
      </div>

      {/* Estadística y búsqueda */}
      <div className="grid gap-4 sm:grid-cols-[220px_1fr]">
        <div className="rounded-xl border bg-card p-4 shadow-sm">
          <p className="text-sm text-muted-foreground">
            Total de asignaciones
          </p>

          <p className="mt-1 text-3xl font-bold">
            {crewAssignments.length}
          </p>
        </div>

        <div className="flex items-center rounded-xl border bg-card p-4 shadow-sm">
          <div className="relative w-full">
            <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

            <Input
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Buscar por vuelo, empleado, estado o cargo..."
              className="pl-9"
            />
          </div>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Tabla */}
      <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
        {isLoading ? (
          <div className="flex min-h-72 items-center justify-center">
            <div className="text-center">
              <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />

              <p className="mt-3 text-sm text-muted-foreground">
                Cargando asignaciones...
              </p>
            </div>
          </div>
        ) : filteredAssignments.length === 0 ? (
          <div className="flex min-h-72 flex-col items-center justify-center px-6 text-center">
            <Users className="h-12 w-12 text-muted-foreground/30" />

            <h2 className="mt-4 font-semibold">
              No hay asignaciones
            </h2>

            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              No encontramos registros con los criterios seleccionados.
            </p>

            <Button
              className="mt-5"
              onClick={openCreateForm}
            >
              <Plus className="mr-2 h-4 w-4" />
              Crear asignación
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px]">
              <thead className="border-b bg-muted/50">
                <tr>
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    ID
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Vuelo
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Empleado
                  </th>

                  <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Acciones
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {filteredAssignments.map(
                  (assignment) => (
                    <tr
                      key={
                        assignment.id_asignacion
                      }
                      className="transition-colors hover:bg-muted/30"
                    >
                      <td className="px-5 py-4 text-sm font-medium">
                        #{assignment.id_asignacion}
                      </td>

                      <td className="px-5 py-4">
                        <p className="font-semibold">
                          {
                            assignment.id_vuelo
                              .codigo_vuelo
                          }
                        </p>

                        <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                          <span>
                            Estado:{' '}
                            {
                              assignment.id_vuelo
                                .estado
                            }
                          </span>

                          <span>
                            Fecha:{' '}
                            {formatDate(
                              assignment.id_vuelo
                                .fecha,
                            )}
                          </span>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <p className="font-semibold">
                          {
                            assignment.id_empleado
                              .nombre
                          }
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                          Cargo:{' '}
                          {
                            assignment.id_empleado
                              .cargo
                          }
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            aria-label="Editar asignación"
                            onClick={() =>
                              openEditForm(
                                assignment,
                              )
                            }
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>

                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            aria-label="Eliminar asignación"
                            className="text-destructive hover:border-destructive/30 hover:bg-destructive/10 hover:text-destructive"
                            onClick={() =>
                              setAssignmentToDelete(
                                assignment,
                              )
                            }
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal crear/editar */}
      {isFormOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <button
            type="button"
            aria-label="Cerrar formulario"
            className="absolute inset-0"
            onClick={closeForm}
          />

          <div className="relative z-10 w-full max-w-lg rounded-2xl border bg-background shadow-2xl">
            <div className="flex items-start justify-between border-b px-6 py-5">
              <div>
                <h2 className="text-xl font-bold">
                  {editingAssignment
                    ? 'Editar asignación'
                    : 'Nueva asignación'}
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  Selecciona el vuelo y el empleado.
                </p>
              </div>

              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={closeForm}
                disabled={isSaving}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-6"
            >
              <div className="space-y-2">
                <Label htmlFor="id_vuelo">
                  Vuelo
                </Label>

                <select
                  id="id_vuelo"
                  required
                  value={form.id_vuelo}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      id_vuelo:
                        event.target.value,
                    }))
                  }
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">
                    Selecciona un vuelo
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
              </div>

              <div className="space-y-2">
                <Label htmlFor="id_empleado">
                  Empleado
                </Label>

                <select
                  id="id_empleado"
                  required
                  value={form.id_empleado}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      id_empleado:
                        event.target.value,
                    }))
                  }
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">
                    Selecciona un empleado
                  </option>

                  {employees.map((employee) => (
                    <option
                      key={employee.id}
                      value={employee.id}
                    >
                      {employee.nombre} —{' '}
                      {employee.cargo}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col-reverse gap-3 border-t pt-5 sm:flex-row sm:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={closeForm}
                  disabled={isSaving}
                >
                  Cancelar
                </Button>

                <Button
                  type="submit"
                  disabled={
                    isSaving ||
                    !form.id_vuelo ||
                    !form.id_empleado
                  }
                >
                  {isSaving && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}

                  {editingAssignment
                    ? 'Guardar cambios'
                    : 'Crear asignación'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmación de eliminación */}
      {assignmentToDelete && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <button
            type="button"
            aria-label="Cancelar eliminación"
            className="absolute inset-0"
            onClick={() =>
              setAssignmentToDelete(null)
            }
          />

          <div className="relative z-10 w-full max-w-md rounded-2xl border bg-background p-6 shadow-2xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
              <Trash2 className="h-5 w-5" />
            </div>

            <h2 className="mt-5 text-xl font-bold">
              Eliminar asignación
            </h2>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Se eliminará la asignación del vuelo{' '}
              <strong>
                {
                  assignmentToDelete.id_vuelo
                    .codigo_vuelo
                }
              </strong>{' '}
              al empleado{' '}
              <strong>
                {
                  assignmentToDelete.id_empleado
                    .nombre
                }
              </strong>
              . Esta acción no se puede deshacer.
            </p>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                disabled={deletingId !== null}
                onClick={() =>
                  setAssignmentToDelete(null)
                }
              >
                Cancelar
              </Button>

              <Button
                type="button"
                variant="destructive"
                disabled={deletingId !== null}
                onClick={handleDelete}
              >
                {deletingId !== null && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}

                Eliminar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function formatDate(date: string) {
  return new Date(
    `${date}T00:00:00`,
  ).toLocaleDateString('es-EC')
}