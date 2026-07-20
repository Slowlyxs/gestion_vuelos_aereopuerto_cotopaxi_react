import {
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from 'react'

import {
  Building2,
  Globe2,
  ImageIcon,
  Pencil,
  Plane,
  Search,
  Trash2,
  Upload,
} from 'lucide-react'

import type { Airline } from '@/domain/entities/airline.entity'

import { useAirlineStore } from '@/presentation/store/airline.store'

import CrudModal from '@/presentation/components/private/crud/CrudModal'
import CrudPageHeader from '@/presentation/components/private/crud/CrudPageHeader'
import CrudTableState from '@/presentation/components/private/crud/CrudTableState'
import DeleteConfirmModal from '@/presentation/components/private/crud/DeleteConfirmModal'

import { Button } from '@/presentation/components/ui/button'
import { Input } from '@/presentation/components/ui/input'
import { Label } from '@/presentation/components/ui/label'

interface AirlineForm {
  nombre: string
  pais: string
  image: File | null
}

const initialForm: AirlineForm = {
  nombre: '',
  pais: '',
  image: null,
}

export default function AirlinesPagePrivate() {
  const {
    airlines,
    isLoading,
    isSaving,
    deletingId,
    error,
    loadAirlines,
    createAirline,
    updateAirline,
    deleteAirline,
    clearError,
  } = useAirlineStore()

  const [search, setSearch] = useState('')
  const [isFormOpen, setIsFormOpen] =
    useState(false)

  const [editingAirline, setEditingAirline] =
    useState<Airline | null>(null)

  const [airlineToDelete, setAirlineToDelete] =
    useState<Airline | null>(null)

  const [form, setForm] =
    useState<AirlineForm>(initialForm)

  const [previewImage, setPreviewImage] =
    useState<string | null>(null)

  useEffect(() => {
    loadAirlines()
  }, [loadAirlines])

  useEffect(() => {
    return () => {
      if (previewImage?.startsWith('blob:')) {
        URL.revokeObjectURL(previewImage)
      }
    }
  }, [previewImage])

  const filteredAirlines = useMemo(() => {
    const normalizedSearch =
      search.trim().toLowerCase()

    if (!normalizedSearch) {
      return airlines
    }

    return airlines.filter((airline) => {
      return (
        airline.nombre
          .toLowerCase()
          .includes(normalizedSearch) ||
        airline.pais
          .toLowerCase()
          .includes(normalizedSearch)
      )
    })
  }, [airlines, search])

  function openCreateForm() {
    clearError()
    setEditingAirline(null)
    setForm(initialForm)
    setPreviewImage(null)
    setIsFormOpen(true)
  }

  function openEditForm(airline: Airline) {
    clearError()
    setEditingAirline(airline)

    setForm({
      nombre: airline.nombre,
      pais: airline.pais,
      image: null,
    })

    setPreviewImage(airline.image_url)
    setIsFormOpen(true)
  }

  function closeForm() {
    if (isSaving) return

    setIsFormOpen(false)
    setEditingAirline(null)
    setForm(initialForm)
    setPreviewImage(null)
    clearError()
  }

  function handleImageChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0] ?? null

    if (!file) {
      setForm((current) => ({
        ...current,
        image: null,
      }))

      setPreviewImage(
        editingAirline?.image_url ?? null,
      )

      return
    }

    if (!file.type.startsWith('image/')) {
      event.target.value = ''
      return
    }

    if (previewImage?.startsWith('blob:')) {
      URL.revokeObjectURL(previewImage)
    }

    setForm((current) => ({
      ...current,
      image: file,
    }))

    setPreviewImage(URL.createObjectURL(file))
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

    const nombre = form.nombre.trim()
    const pais = form.pais.trim()

    if (!nombre || !pais) {
      return
    }

    const payload = {
      nombre,
      pais,
      image: form.image,
    }

    try {
      if (editingAirline) {
        await updateAirline(
          editingAirline.id_aerolinea,
          payload,
        )
      } else {
        await createAirline(payload)
      }

      closeForm()
    } catch {
      // El store ya muestra el error.
    }
  }

  async function handleDelete() {
    if (!airlineToDelete) return

    try {
      await deleteAirline(
        airlineToDelete.id_aerolinea,
      )

      setAirlineToDelete(null)
    } catch {
      // El store ya muestra el error.
    }
  }

  const hasSearch = search.trim().length > 0

  return (
    <div className="space-y-6">
      <CrudPageHeader
        title="Aerolíneas"
        description="Gestiona las aerolíneas registradas en el sistema."
        icon={<Building2 className="h-5 w-5" />}
        buttonLabel="Nueva aerolínea"
        onCreate={openCreateForm}
      />

      <div className="grid gap-4 md:grid-cols-[220px_1fr]">
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <p className="text-sm text-muted-foreground">
            Total de aerolíneas
          </p>

          <p className="mt-1 text-3xl font-bold">
            {airlines.length}
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
              placeholder="Buscar por nombre o país..."
              className="pl-9"
            />
          </div>
        </div>
      </div>

      {error && airlines.length > 0 && (
        <div className="rounded-lg border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <CrudTableState
        isLoading={isLoading}
        error={
          airlines.length === 0
            ? error
            : null
        }
        isEmpty={filteredAirlines.length === 0}
        loadingMessage="Cargando aerolíneas..."
        emptyTitle={
          hasSearch
            ? 'No encontramos aerolíneas'
            : 'No hay aerolíneas registradas'
        }
        emptyDescription={
          hasSearch
            ? 'Prueba buscando con otro nombre o país.'
            : 'Crea la primera aerolínea para comenzar.'
        }
        emptyIcon={
          <Building2 className="h-8 w-8" />
        }
        createLabel="Nueva aerolínea"
        onCreate={openCreateForm}
        onRetry={loadAirlines}
      >
        <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead className="border-b bg-muted/50">
                <tr>
                  <TableHeader>Imagen</TableHeader>
                  <TableHeader>Aerolínea</TableHeader>
                  <TableHeader>País</TableHeader>
                  <TableHeader align="right">
                    Acciones
                  </TableHeader>
                </tr>
              </thead>

              <tbody className="divide-y">
                {filteredAirlines.map((airline) => (
                  <tr
                    key={airline.id_aerolinea}
                    className="transition-colors hover:bg-muted/30"
                  >
                    <td className="px-5 py-4">
                      <AirlineImage
                        airline={airline}
                      />
                    </td>

                    <td className="px-5 py-4">
                      <p className="font-semibold">
                        {airline.nombre}
                      </p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        ID #{airline.id_aerolinea}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Globe2 className="h-4 w-4 text-primary" />
                        {airline.pais}
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          aria-label={`Editar ${airline.nombre}`}
                          onClick={() =>
                            openEditForm(airline)
                          }
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>

                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          aria-label={`Eliminar ${airline.nombre}`}
                          className="text-destructive hover:border-destructive/30 hover:bg-destructive/10 hover:text-destructive"
                          onClick={() =>
                            setAirlineToDelete(
                              airline,
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

      <CrudModal
        open={isFormOpen}
        title={
          editingAirline
            ? 'Editar aerolínea'
            : 'Nueva aerolínea'
        }
        description={
          editingAirline
            ? 'Actualiza los datos de la aerolínea seleccionada.'
            : 'Ingresa los datos de la nueva aerolínea.'
        }
        isSaving={isSaving}
        submitLabel={
          editingAirline
            ? 'Guardar cambios'
            : 'Crear aerolínea'
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
          <Label htmlFor="airline-name">
            Nombre
          </Label>

          <Input
            id="airline-name"
            required
            value={form.nombre}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                nombre: event.target.value,
              }))
            }
            placeholder="Cotopaxi Airlines"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="airline-country">
            País
          </Label>

          <Input
            id="airline-country"
            required
            value={form.pais}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                pais: event.target.value,
              }))
            }
            placeholder="Ecuador"
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="airline-image">
            Imagen de la aerolínea
          </Label>

          <div className="grid gap-4 sm:grid-cols-[140px_1fr]">
            <div className="flex h-32 items-center justify-center overflow-hidden rounded-xl border bg-muted/30">
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Vista previa"
                  className="h-full w-full object-cover"
                />
              ) : (
                <ImageIcon className="h-10 w-10 text-muted-foreground/40" />
              )}
            </div>

            <label
              htmlFor="airline-image"
              className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed p-5 text-center transition hover:border-primary/50 hover:bg-primary/5"
            >
              <Upload className="h-6 w-6 text-primary" />

              <span className="mt-2 text-sm font-semibold">
                Seleccionar imagen
              </span>

              <span className="mt-1 text-xs text-muted-foreground">
                JPG, PNG o WEBP
              </span>

              <input
                id="airline-image"
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="sr-only"
                onChange={handleImageChange}
              />
            </label>
          </div>
        </div>
      </CrudModal>

      <DeleteConfirmModal
        open={airlineToDelete !== null}
        title="Eliminar aerolínea"
        description={
          airlineToDelete
            ? `Se eliminará la aerolínea “${airlineToDelete.nombre}”. La operación puede fallar si tiene aviones o vuelos relacionados.`
            : ''
        }
        isDeleting={deletingId !== null}
        onCancel={() => {
          if (deletingId === null) {
            setAirlineToDelete(null)
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

function AirlineImage({
  airline,
}: {
  airline: Airline
}) {
  if (airline.image_url) {
    return (
      <img
        src={airline.image_url}
        alt={airline.nombre}
        className="h-12 w-16 rounded-lg border object-cover"
      />
    )
  }

  return (
    <div className="flex h-12 w-16 items-center justify-center rounded-lg border bg-muted/40">
      <Plane className="h-5 w-5 text-muted-foreground/40" />
    </div>
  )
}