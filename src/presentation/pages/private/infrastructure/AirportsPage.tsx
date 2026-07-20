import {
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react'

import {
  ImageIcon,
  MapPin,
  Pencil,
  Plane,
  Search,
  Trash2,
  Upload,
} from 'lucide-react'

import type { Airport } from '@/domain/entities/airport.entity'

import { useAirportStore } from '@/presentation/store/airport.store'

import CrudModal from '@/presentation/components/private/crud/CrudModal'
import CrudPageHeader from '@/presentation/components/private/crud/CrudPageHeader'
import CrudTableState from '@/presentation/components/private/crud/CrudTableState'
import DeleteConfirmModal from '@/presentation/components/private/crud/DeleteConfirmModal'

import { Button } from '@/presentation/components/ui/button'
import { Input } from '@/presentation/components/ui/input'
import { Label } from '@/presentation/components/ui/label'

interface AirportForm {
  nombre: string
  ciudad: string
  pais: string
  codigo_iata: string
  image: File | null
}

const initialForm: AirportForm = {
  nombre: '',
  ciudad: '',
  pais: '',
  codigo_iata: '',
  image: null,
}

export default function AirportsPage() {
  const {
    airports,
    isLoading,
    isSaving,
    deletingId,
    error,
    loadAirports,
    createAirport,
    updateAirport,
    deleteAirport,
    clearError,
  } = useAirportStore()

  const [search, setSearch] = useState('')

  const [isFormOpen, setIsFormOpen] =
    useState(false)

  const [editingAirport, setEditingAirport] =
    useState<Airport | null>(null)

  const [airportToDelete, setAirportToDelete] =
    useState<Airport | null>(null)

  const [form, setForm] =
    useState<AirportForm>(initialForm)

  const [previewImage, setPreviewImage] =
    useState<string | null>(null)

  useEffect(() => {
    loadAirports()
  }, [loadAirports])

  useEffect(() => {
    return () => {
      if (previewImage?.startsWith('blob:')) {
        URL.revokeObjectURL(previewImage)
      }
    }
  }, [previewImage])

  const filteredAirports = useMemo(() => {
    const normalizedSearch =
      search.trim().toLowerCase()

    if (!normalizedSearch) {
      return airports
    }

    return airports.filter((airport) => {
      return (
        airport.nombre
          .toLowerCase()
          .includes(normalizedSearch) ||
        airport.ciudad
          .toLowerCase()
          .includes(normalizedSearch) ||
        airport.pais
          .toLowerCase()
          .includes(normalizedSearch) ||
        airport.codigo_iata
          .toLowerCase()
          .includes(normalizedSearch)
      )
    })
  }, [airports, search])

  function openCreateForm() {
    clearError()

    setEditingAirport(null)
    setForm(initialForm)
    setPreviewImage(null)
    setIsFormOpen(true)
  }

  function openEditForm(airport: Airport) {
    clearError()

    setEditingAirport(airport)

    setForm({
      nombre: airport.nombre,
      ciudad: airport.ciudad,
      pais: airport.pais,
      codigo_iata: airport.codigo_iata,
      image: null,
    })

    setPreviewImage(airport.image_url)
    setIsFormOpen(true)
  }

  function closeForm() {
    if (isSaving) return

    setIsFormOpen(false)
    setEditingAirport(null)
    setForm(initialForm)
    setPreviewImage(null)
    clearError()
  }

  function handleImageChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0] ?? null

    setForm((current) => ({
      ...current,
      image: file,
    }))

    if (!file) {
      setPreviewImage(
        editingAirport?.image_url ?? null,
      )
      return
    }

    if (!file.type.startsWith('image/')) {
      event.target.value = ''

      setForm((current) => ({
        ...current,
        image: null,
      }))

      return
    }

    setPreviewImage(URL.createObjectURL(file))
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

    const nombre = form.nombre.trim()
    const ciudad = form.ciudad.trim()
    const pais = form.pais.trim()
    const codigoIata = form.codigo_iata
      .trim()
      .toUpperCase()

    if (
      !nombre ||
      !ciudad ||
      !pais ||
      !codigoIata
    ) {
      return
    }

    const payload = {
      nombre,
      ciudad,
      pais,
      codigo_iata: codigoIata,
      image: form.image,
    }

    try {
      if (editingAirport) {
        await updateAirport(
          editingAirport.id_aeropuerto,
          payload,
        )
      } else {
        await createAirport(payload)
      }

      closeForm()
    } catch {
      // El store ya muestra el error.
    }
  }

  async function handleDelete() {
    if (!airportToDelete) return

    try {
      await deleteAirport(
        airportToDelete.id_aeropuerto,
      )

      setAirportToDelete(null)
    } catch {
      // El store ya muestra el error.
    }
  }

  const hasSearch = search.trim().length > 0

  return (
    <div className="space-y-6">
      <CrudPageHeader
        title="Aeropuertos"
        description="Gestiona los aeropuertos registrados en el sistema."
        icon={<Plane className="h-5 w-5" />}
        buttonLabel="Nuevo aeropuerto"
        onCreate={openCreateForm}
      />

      {/* Resumen y búsqueda */}
      <div className="grid gap-4 md:grid-cols-[220px_1fr]">
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <p className="text-sm text-muted-foreground">
            Total de aeropuertos
          </p>

          <p className="mt-1 text-3xl font-bold">
            {airports.length}
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
              placeholder="Buscar por nombre, ciudad, país o código IATA..."
              className="pl-9"
            />
          </div>
        </div>
      </div>

      {error && airports.length > 0 && (
        <div className="rounded-lg border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <CrudTableState
        isLoading={isLoading}
        error={
          airports.length === 0
            ? error
            : null
        }
        isEmpty={filteredAirports.length === 0}
        loadingMessage="Cargando aeropuertos..."
        emptyTitle={
          hasSearch
            ? 'No encontramos aeropuertos'
            : 'No hay aeropuertos registrados'
        }
        emptyDescription={
          hasSearch
            ? 'Prueba utilizando otro nombre, ciudad, país o código IATA.'
            : 'Crea el primer aeropuerto para comenzar a gestionar la infraestructura.'
        }
        emptyIcon={
          <Plane className="h-8 w-8" />
        }
        createLabel="Nuevo aeropuerto"
        onCreate={openCreateForm}
        onRetry={loadAirports}
      >
        <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[950px]">
              <thead className="border-b bg-muted/50">
                <tr>
                  <TableHeader>
                    Imagen
                  </TableHeader>

                  <TableHeader>
                    Código
                  </TableHeader>

                  <TableHeader>
                    Aeropuerto
                  </TableHeader>

                  <TableHeader>
                    Ciudad
                  </TableHeader>

                  <TableHeader>
                    País
                  </TableHeader>

                  <TableHeader align="right">
                    Acciones
                  </TableHeader>
                </tr>
              </thead>

              <tbody className="divide-y">
                {filteredAirports.map((airport) => (
                  <tr
                    key={airport.id_aeropuerto}
                    className="transition-colors hover:bg-muted/30"
                  >
                    <td className="px-5 py-4">
                      <AirportImage
                        airport={airport}
                      />
                    </td>

                    <td className="px-5 py-4">
                      <span className="inline-flex rounded-md bg-primary/10 px-3 py-1 text-sm font-bold text-primary">
                        {airport.codigo_iata}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <p className="font-semibold">
                        {airport.nombre}
                      </p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        ID #{airport.id_aeropuerto}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-primary" />
                        {airport.ciudad}
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm">
                      {airport.pais}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          aria-label={`Editar ${airport.nombre}`}
                          onClick={() =>
                            openEditForm(airport)
                          }
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>

                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          aria-label={`Eliminar ${airport.nombre}`}
                          className="text-destructive hover:border-destructive/30 hover:bg-destructive/10 hover:text-destructive"
                          onClick={() =>
                            setAirportToDelete(
                              airport,
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

      {/* Modal crear y editar */}
      <CrudModal
        open={isFormOpen}
        title={
          editingAirport
            ? 'Editar aeropuerto'
            : 'Nuevo aeropuerto'
        }
        description={
          editingAirport
            ? 'Actualiza la información del aeropuerto seleccionado.'
            : 'Ingresa la información del nuevo aeropuerto.'
        }
        isSaving={isSaving}
        submitLabel={
          editingAirport
            ? 'Guardar cambios'
            : 'Crear aeropuerto'
        }
        onClose={closeForm}
        onSubmit={handleSubmit}
      >
        {error && (
          <div className="rounded-lg border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="airport-name">
              Nombre
            </Label>

            <Input
              id="airport-name"
              required
              value={form.nombre}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  nombre: event.target.value,
                }))
              }
              placeholder="Mariscal Sucre"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="airport-code">
              Código IATA
            </Label>

            <Input
              id="airport-code"
              required
              value={form.codigo_iata}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  codigo_iata:
                    event.target.value
                      .toUpperCase()
                      .replace(/[^A-Z]/g, '')
                      .slice(0, 3),
                }))
              }
              placeholder="UIO"
              className="uppercase"
              maxLength={3}
            />

            <p className="text-xs text-muted-foreground">
              Utiliza tres letras, por ejemplo UIO.
            </p>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="airport-city">
              Ciudad
            </Label>

            <Input
              id="airport-city"
              required
              value={form.ciudad}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  ciudad: event.target.value,
                }))
              }
              placeholder="Quito"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="airport-country">
              País
            </Label>

            <Input
              id="airport-country"
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
        </div>

        <div className="space-y-3">
          <Label htmlFor="airport-image">
            Imagen del aeropuerto
          </Label>

          <div className="grid gap-4 sm:grid-cols-[140px_1fr]">
            <div className="flex h-32 items-center justify-center overflow-hidden rounded-xl border bg-muted/30">
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Vista previa del aeropuerto"
                  className="h-full w-full object-cover"
                />
              ) : (
                <ImageIcon className="h-10 w-10 text-muted-foreground/40" />
              )}
            </div>

            <label
              htmlFor="airport-image"
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
                id="airport-image"
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="sr-only"
                onChange={handleImageChange}
              />
            </label>
          </div>
        </div>
      </CrudModal>

      {/* Confirmación para eliminar */}
      <DeleteConfirmModal
        open={airportToDelete !== null}
        title="Eliminar aeropuerto"
        description={
          airportToDelete
            ? `Se eliminará el aeropuerto “${airportToDelete.nombre}” (${airportToDelete.codigo_iata}). Esta acción no se puede deshacer y puede fallar si existen terminales, vuelos u otros registros relacionados.`
            : ''
        }
        isDeleting={deletingId !== null}
        onCancel={() => {
          if (deletingId === null) {
            setAirportToDelete(null)
          }
        }}
        onConfirm={handleDelete}
      />
    </div>
  )
}

interface TableHeaderProps {
  children: React.ReactNode
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

function AirportImage({
  airport,
}: {
  airport: Airport
}) {
  if (airport.image_url) {
    return (
      <img
        src={airport.image_url}
        alt={airport.nombre}
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