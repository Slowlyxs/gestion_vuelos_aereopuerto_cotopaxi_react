// src/presentation/pages/public/ContactPage.tsx

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Clock3,
  Headphones,
  Loader2,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Plane,
  Send,
} from 'lucide-react'

import { Button } from '@/presentation/components/ui/button'
import { Input } from '@/presentation/components/ui/input'
import { Label } from '@/presentation/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/presentation/components/ui/card'

// ─── Validación ───────────────────────────────────────────────────────────────

const contactSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(3, 'Ingresa un nombre válido'),

  correo: z
    .string()
    .trim()
    .email('Ingresa un correo electrónico válido'),

  telefono: z
    .string()
    .trim()
    .optional(),

  asunto: z
    .string()
    .min(1, 'Selecciona un asunto'),

  codigoVuelo: z
    .string()
    .trim()
    .optional(),

  mensaje: z
    .string()
    .trim()
    .min(10, 'El mensaje debe tener al menos 10 caracteres')
    .max(1000, 'El mensaje no puede superar los 1000 caracteres'),
})

type ContactFormData = z.infer<typeof contactSchema>

// ─── Página ───────────────────────────────────────────────────────────────────

export default function ContactPage() {
  const [isSending, setIsSending] = useState(false)
  const [wasSent, setWasSent] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      nombre: '',
      correo: '',
      telefono: '',
      asunto: '',
      codigoVuelo: '',
      mensaje: '',
    },
  })

  const message = watch('mensaje') ?? ''

  async function onSubmit(data: ContactFormData) {
    setIsSending(true)
    setWasSent(false)

    try {
      /*
       * Cuando exista un endpoint de contacto, reemplaza esta simulación por:
       *
       * await apiClient.post('/contactos/', data)
       */

      await new Promise((resolve) => setTimeout(resolve, 900))

      console.log('Formulario de contacto:', data)

      setWasSent(true)
      reset()
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="bg-background">
      {/* Encabezado */}
      <section className="relative overflow-hidden border-b bg-gradient-to-br from-primary/15 via-background to-secondary/10">
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border bg-background/80 px-4 py-2 text-sm shadow-sm backdrop-blur">
              <Headphones className="h-4 w-4 text-primary" />
              Centro de atención
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Estamos para ayudarte
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
              Comunícate con nuestro equipo para consultar vuelos, horarios,
              aerolíneas, documentación o cualquier inquietud relacionada con
              tu viaje.
            </p>
          </div>
        </div>
      </section>

      {/* Canales de contacto */}
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <ContactMethod
            icon={<Phone className="h-5 w-5" />}
            title="Teléfono"
            description="Atención telefónica"
            value="+593 00 000 0000"
            href="tel:+593000000000"
          />

          <ContactMethod
            icon={<Mail className="h-5 w-5" />}
            title="Correo"
            description="Consultas generales"
            value="contacto@cotopaxiairlines.com"
            href="mailto:contacto@cotopaxiairlines.com"
          />

          <ContactMethod
            icon={<Clock3 className="h-5 w-5" />}
            title="Horario"
            description="Servicio al pasajero"
            value="Lunes a domingo, 24 horas"
          />

          <ContactMethod
            icon={<MapPin className="h-5 w-5" />}
            title="Ubicación"
            description="Oficina de atención"
            value="Aeropuerto Internacional Cotopaxi"
          />
        </div>
      </section>

      {/* Formulario e información */}
      <section className="mx-auto grid max-w-7xl gap-8 px-6 pb-16 lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
        <Card className="shadow-sm">
          <CardHeader>
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-primary/10 p-3 text-primary">
                <MessageSquare className="h-5 w-5" />
              </div>

              <div>
                <CardTitle>Envíanos un mensaje</CardTitle>

                <CardDescription className="mt-1">
                  Completa el formulario y nuestro equipo revisará tu
                  solicitud.
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {wasSent && (
              <div className="mb-6 flex items-start gap-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />

                <div>
                  <p className="font-semibold">
                    Mensaje registrado
                  </p>

                  <p className="mt-1">
                    Tu solicitud fue preparada correctamente. Para enviarla
                    realmente debes conectar el formulario con un endpoint del
                    backend.
                  </p>
                </div>
              </div>
            )}

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5"
              noValidate
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <FormField
                  label="Nombre completo"
                  htmlFor="nombre"
                  error={errors.nombre?.message}
                >
                  <Input
                    id="nombre"
                    type="text"
                    autoComplete="name"
                    placeholder="Alejandro Alarcón"
                    aria-invalid={Boolean(errors.nombre)}
                    {...register('nombre')}
                  />
                </FormField>

                <FormField
                  label="Correo electrónico"
                  htmlFor="correo"
                  error={errors.correo?.message}
                >
                  <Input
                    id="correo"
                    type="email"
                    autoComplete="email"
                    placeholder="correo@ejemplo.com"
                    aria-invalid={Boolean(errors.correo)}
                    {...register('correo')}
                  />
                </FormField>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <FormField
                  label="Teléfono"
                  htmlFor="telefono"
                  optional
                  error={errors.telefono?.message}
                >
                  <Input
                    id="telefono"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+593 99 000 0000"
                    aria-invalid={Boolean(errors.telefono)}
                    {...register('telefono')}
                  />
                </FormField>

                <FormField
                  label="Asunto"
                  htmlFor="asunto"
                  error={errors.asunto?.message}
                >
                  <select
                    id="asunto"
                    aria-invalid={Boolean(errors.asunto)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none transition focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    {...register('asunto')}
                  >
                    <option value="">
                      Selecciona una opción
                    </option>

                    <option value="informacion-vuelo">
                      Información de un vuelo
                    </option>

                    <option value="horarios">
                      Horarios
                    </option>

                    <option value="equipaje">
                      Equipaje
                    </option>

                    <option value="documentacion">
                      Documentación de viaje
                    </option>

                    <option value="aerolineas">
                      Aerolíneas
                    </option>

                    <option value="queja-sugerencia">
                      Queja o sugerencia
                    </option>

                    <option value="otro">
                      Otro
                    </option>
                  </select>
                </FormField>
              </div>

              <FormField
                label="Código de vuelo"
                htmlFor="codigoVuelo"
                optional
                error={errors.codigoVuelo?.message}
              >
                <Input
                  id="codigoVuelo"
                  type="text"
                  placeholder="Ejemplo: LA102"
                  aria-invalid={Boolean(errors.codigoVuelo)}
                  {...register('codigoVuelo')}
                />
              </FormField>

              <FormField
                label="Mensaje"
                htmlFor="mensaje"
                error={errors.mensaje?.message}
              >
                <textarea
                  id="mensaje"
                  rows={6}
                  maxLength={1000}
                  placeholder="Describe tu consulta con el mayor detalle posible..."
                  aria-invalid={Boolean(errors.mensaje)}
                  className="flex min-h-32 w-full resize-y rounded-md border border-input bg-background px-3 py-2 text-sm outline-none transition placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
                  {...register('mensaje')}
                />

                <p className="text-right text-xs text-muted-foreground">
                  {message.length}/1000
                </p>
              </FormField>

              <Button
                type="submit"
                size="lg"
                className="w-full sm:w-auto"
                disabled={isSending}
              >
                {isSending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Procesando...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Enviar mensaje
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Panel lateral */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="mb-2 w-fit rounded-xl bg-primary/10 p-3 text-primary">
                <Building2 className="h-5 w-5" />
              </div>

              <CardTitle>Atención en el aeropuerto</CardTitle>

              <CardDescription>
                También puedes acercarte directamente a nuestro punto de
                información.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-5">
              <InfoRow
                icon={<MapPin className="h-4 w-4" />}
                title="Dirección"
                description="Aeropuerto Internacional Cotopaxi, Ecuador"
              />

              <InfoRow
                icon={<Clock3 className="h-4 w-4" />}
                title="Horario presencial"
                description="Todos los días, de 06:00 a 22:00"
              />

              <InfoRow
                icon={<Plane className="h-4 w-4" />}
                title="Consultas de vuelos"
                description="Ten disponible tu código de vuelo para recibir una atención más rápida."
              />
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="text-xl">
                Consulta antes de escribirnos
              </CardTitle>

              <CardDescription>
                Es posible que la respuesta que buscas ya esté disponible en
                nuestra sección de información.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-3">
              <Button
                asChild
                variant="outline"
                className="w-full justify-between bg-background"
              >
                <Link to="/informacion">
                  Información para viajar
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="w-full justify-between bg-background"
              >
                <Link to="/vuelos">
                  Consultar vuelos
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="w-full justify-between bg-background"
              >
                <Link to="/aerolineas">
                  Ver aerolíneas
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}

// ─── Componentes auxiliares ───────────────────────────────────────────────────

interface ContactMethodProps {
  icon: React.ReactNode
  title: string
  description: string
  value: string
  href?: string
}

function ContactMethod({
  icon,
  title,
  description,
  value,
  href,
}: ContactMethodProps) {
  const content = (
    <Card className="h-full transition hover:-translate-y-1 hover:shadow-md">
      <CardHeader>
        <div className="mb-2 w-fit rounded-xl bg-primary/10 p-3 text-primary">
          {icon}
        </div>

        <CardTitle className="text-lg">
          {title}
        </CardTitle>

        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <p className="text-sm font-medium">
          {value}
        </p>
      </CardContent>
    </Card>
  )

  if (!href) {
    return content
  }

  return (
    <a href={href} className="block">
      {content}
    </a>
  )
}

interface FormFieldProps {
  label: string
  htmlFor: string
  error?: string
  optional?: boolean
  children: React.ReactNode
}

function FormField({
  label,
  htmlFor,
  error,
  optional = false,
  children,
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <Label htmlFor={htmlFor}>
          {label}
        </Label>

        {optional && (
          <span className="text-xs text-muted-foreground">
            Opcional
          </span>
        )}
      </div>

      {children}

      {error && (
        <p className="text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}

interface InfoRowProps {
  icon: React.ReactNode
  title: string
  description: string
}

function InfoRow({
  icon,
  title,
  description,
}: InfoRowProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 rounded-lg bg-primary/10 p-2 text-primary">
        {icon}
      </div>

      <div>
        <p className="text-sm font-semibold">
          {title}
        </p>

        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  )
}