// src/presentation/pages/public/InformationPage.tsx

import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import {
  AlertTriangle,
  ArrowRight,
  BaggageClaim,
  CalendarCheck,
  CheckCircle2,
  Clock3,
  FileCheck2,
  Headphones,
  HelpCircle,
  Info,
  Laptop,
  Luggage,
  MapPin,
  Plane,
  Search,
  ShieldCheck,
  Smartphone,
  TicketCheck,
  Users,
} from 'lucide-react'

import { Button } from '@/presentation/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/presentation/components/ui/card'

const informationSections = [
  {
    id: 'documentos',
    icon: <FileCheck2 className="h-6 w-6" />,
    title: 'Documentación',
    description:
      'Revisa los documentos necesarios antes de presentarte en el aeropuerto.',
  },
  {
    id: 'equipaje',
    icon: <BaggageClaim className="h-6 w-6" />,
    title: 'Equipaje',
    description:
      'Consulta recomendaciones para preparar tu equipaje de mano y equipaje facturado.',
  },
  {
    id: 'aeropuerto',
    icon: <Clock3 className="h-6 w-6" />,
    title: 'Llegada al aeropuerto',
    description:
      'Conoce con cuánto tiempo de anticipación debes llegar antes de tu vuelo.',
  },
  {
    id: 'estado-vuelo',
    icon: <Plane className="h-6 w-6" />,
    title: 'Estado del vuelo',
    description:
      'Consulta la fecha, aeronave, aerolínea y estado actual de tu vuelo.',
  },
]

const frequentlyAskedQuestions = [
  {
    question: '¿Con cuánto tiempo debo llegar al aeropuerto?',
    answer:
      'Como recomendación general, llega al menos 2 horas antes para vuelos nacionales y 3 horas antes para vuelos internacionales. El tiempo puede variar según la aerolínea y el aeropuerto.',
  },
  {
    question: '¿Dónde puedo consultar el estado de mi vuelo?',
    answer:
      'Puedes revisar el estado desde la sección Vuelos. Busca utilizando el código del vuelo, la fecha, el estado o el nombre de la aerolínea.',
  },
  {
    question: '¿Qué documentos debo llevar?',
    answer:
      'Debes presentar un documento de identidad vigente. Para viajes internacionales también necesitarás pasaporte y, según el destino, visa u otros requisitos migratorios.',
  },
  {
    question: '¿Qué hago si mi vuelo aparece retrasado?',
    answer:
      'Consulta nuevamente el estado del vuelo y comunícate con la aerolínea responsable. También puedes utilizar nuestra sección de contacto e indicar el código del vuelo.',
  },
  {
    question: '¿Puedo llevar líquidos en el equipaje de mano?',
    answer:
      'Los líquidos suelen estar sujetos a restricciones de cantidad y presentación. Confirma las reglas aplicables con la aerolínea antes de viajar.',
  },
]

export default function InformationPage() {
  return (
    <div className="bg-background">
      {/* Encabezado */}
      <section className="relative overflow-hidden border-b bg-gradient-to-br from-primary/15 via-background to-secondary/10">
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border bg-background/80 px-4 py-2 text-sm shadow-sm backdrop-blur">
              <Info className="h-4 w-4 text-primary" />
              Información para pasajeros
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Prepárate para tu próximo viaje
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
              Encuentra recomendaciones sobre documentación, equipaje,
              llegada al aeropuerto, seguridad y consulta de vuelos.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/vuelos">
                  <Search className="mr-2 h-4 w-4" />
                  Consultar vuelos
                </Link>
              </Button>

              <Button asChild size="lg" variant="outline">
                <Link to="/contacto">
                  <Headphones className="mr-2 h-4 w-4" />
                  Contactar soporte
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Navegación rápida */}
      <section className="border-b bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {informationSections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="group block"
              >
                <Card className="h-full transition duration-200 group-hover:-translate-y-1 group-hover:shadow-md">
                  <CardHeader>
                    <div className="mb-2 w-fit rounded-xl bg-primary/10 p-3 text-primary">
                      {section.icon}
                    </div>

                    <CardTitle className="text-lg">
                      {section.title}
                    </CardTitle>

                    <CardDescription className="leading-6">
                      {section.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <span className="inline-flex items-center text-sm font-medium text-primary">
                      Ver información
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Antes de viajar */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <SectionHeading
          eyebrow="Antes de volar"
          title="Organiza tu viaje con anticipación"
          description="Completa estas verificaciones antes de dirigirte al aeropuerto."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <TravelStep
            number="01"
            icon={<CalendarCheck className="h-5 w-5" />}
            title="Confirma tu vuelo"
            description="Revisa el código, la fecha y el estado actual de tu vuelo."
          />

          <TravelStep
            number="02"
            icon={<FileCheck2 className="h-5 w-5" />}
            title="Prepara tus documentos"
            description="Comprueba que tu identificación y documentos estén vigentes."
          />

          <TravelStep
            number="03"
            icon={<Luggage className="h-5 w-5" />}
            title="Organiza tu equipaje"
            description="Verifica peso, dimensiones y artículos permitidos."
          />

          <TravelStep
            number="04"
            icon={<MapPin className="h-5 w-5" />}
            title="Llega con tiempo"
            description="Preséntate con anticipación para completar todos los controles."
          />
        </div>
      </section>

      {/* Documentación */}
      <section
        id="documentos"
        className="scroll-mt-24 border-y bg-muted/30"
      >
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">
          <div>
            <div className="w-fit rounded-2xl bg-primary/10 p-4 text-primary">
              <FileCheck2 className="h-8 w-8" />
            </div>

            <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-primary">
              Documentación
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight">
              Verifica tus documentos antes de viajar
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              Los requisitos pueden cambiar dependiendo del destino, la
              nacionalidad del pasajero y el tipo de viaje.
            </p>
          </div>

          <Card>
            <CardContent className="space-y-4 pt-6">
              <ChecklistItem
                title="Documento de identidad"
                description="Lleva tu cédula o documento oficial vigente y en buen estado."
              />

              <ChecklistItem
                title="Pasaporte"
                description="Para viajes internacionales, verifica su vigencia y las condiciones del país de destino."
              />

              <ChecklistItem
                title="Visa y permisos"
                description="Confirma si el país de destino exige visa, autorización o documentación adicional."
              />

              <ChecklistItem
                title="Documentos de menores"
                description="Los menores pueden necesitar autorizaciones especiales para viajar."
              />

              <ChecklistItem
                title="Información del vuelo"
                description="Guarda el código de vuelo y los datos de la aerolínea responsable."
              />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Equipaje */}
      <section
        id="equipaje"
        className="scroll-mt-24"
      >
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <SectionHeading
            eyebrow="Equipaje"
            title="Prepara correctamente tus pertenencias"
            description="Las condiciones exactas dependen de la aerolínea y de la tarifa del pasajero."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <InformationCard
              icon={<Laptop className="h-6 w-6" />}
              title="Equipaje de mano"
              description="Debe cumplir las dimensiones y el peso establecidos por la aerolínea."
              items={[
                'Guarda tus documentos y objetos importantes.',
                'Protege dispositivos electrónicos.',
                'Mantén los medicamentos necesarios contigo.',
              ]}
            />

            <InformationCard
              icon={<BaggageClaim className="h-6 w-6" />}
              title="Equipaje facturado"
              description="Identifica correctamente cada maleta antes de entregarla."
              items={[
                'Consulta el peso incluido en tu tarifa.',
                'Evita guardar objetos frágiles o de valor.',
                'Conserva el comprobante del equipaje.',
              ]}
            />

            <InformationCard
              icon={<AlertTriangle className="h-6 w-6" />}
              title="Artículos restringidos"
              description="Algunos objetos no pueden transportarse o requieren condiciones especiales."
              items={[
                'Sustancias inflamables o peligrosas.',
                'Objetos que puedan representar un riesgo.',
                'Baterías o líquidos fuera de las condiciones permitidas.',
              ]}
            />
          </div>

          <div className="mt-8 rounded-xl border border-amber-500/30 bg-amber-500/10 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />

              <div>
                <p className="font-semibold text-amber-800">
                  Verifica las condiciones de tu aerolínea
                </p>

                <p className="mt-1 text-sm leading-6 text-amber-800/80">
                  Los límites de peso, dimensiones y artículos aceptados
                  pueden variar. Revisa siempre las políticas de la aerolínea
                  antes de viajar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Llegada al aeropuerto */}
      <section
        id="aeropuerto"
        className="scroll-mt-24 border-y bg-muted/30"
      >
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <SectionHeading
            eyebrow="En el aeropuerto"
            title="Llega con suficiente anticipación"
            description="Evita contratiempos reservando tiempo para cada etapa del proceso aeroportuario."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="mb-2 w-fit rounded-xl bg-primary/10 p-3 text-primary">
                  <Clock3 className="h-6 w-6" />
                </div>

                <CardTitle>Tiempo recomendado</CardTitle>

                <CardDescription>
                  Estas horas son una recomendación general.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <TimeRecommendation
                  title="Vuelos nacionales"
                  time="2 horas antes"
                  description="Permite completar registro, entrega de equipaje y controles de seguridad."
                />

                <TimeRecommendation
                  title="Vuelos internacionales"
                  time="3 horas antes"
                  description="Considera controles migratorios y requisitos adicionales."
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-2 w-fit rounded-xl bg-primary/10 p-3 text-primary">
                  <TicketCheck className="h-6 w-6" />
                </div>

                <CardTitle>Proceso en el aeropuerto</CardTitle>

                <CardDescription>
                  Ten preparados tus documentos y la información del vuelo.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-5">
                  <ProcessItem
                    number="1"
                    title="Ubica tu aerolínea"
                    description="Consulta el mostrador o área correspondiente."
                  />

                  <ProcessItem
                    number="2"
                    title="Completa el registro"
                    description="Presenta tus documentos y entrega el equipaje facturado."
                  />

                  <ProcessItem
                    number="3"
                    title="Pasa los controles"
                    description="Cumple los controles de seguridad y migración cuando corresponda."
                  />

                  <ProcessItem
                    number="4"
                    title="Dirígete a la puerta"
                    description="Verifica la puerta de embarque y permanece atento a los avisos."
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Estado del vuelo */}
      <section
        id="estado-vuelo"
        className="scroll-mt-24"
      >
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8">
          <div>
            <div className="w-fit rounded-2xl bg-primary/10 p-4 text-primary">
              <Plane className="h-8 w-8" />
            </div>

            <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-primary">
              Estado del vuelo
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight">
              Consulta los cambios antes de salir
            </h2>

            <p className="mt-4 max-w-xl leading-7 text-muted-foreground">
              Los vuelos pueden cambiar debido a condiciones climáticas,
              operativas o aeroportuarias. Revisa periódicamente su estado.
            </p>

            <Button asChild size="lg" className="mt-7">
              <Link to="/vuelos">
                Consultar vuelos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle>
                Información disponible
              </CardTitle>

              <CardDescription>
                En nuestra sección de vuelos podrás consultar:
              </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-4 sm:grid-cols-2">
              <FeatureItem
                icon={<TicketCheck className="h-5 w-5" />}
                title="Código de vuelo"
              />

              <FeatureItem
                icon={<CalendarCheck className="h-5 w-5" />}
                title="Fecha programada"
              />

              <FeatureItem
                icon={<Plane className="h-5 w-5" />}
                title="Aeronave asignada"
              />

              <FeatureItem
                icon={<Users className="h-5 w-5" />}
                title="Capacidad"
              />

              <FeatureItem
                icon={<ShieldCheck className="h-5 w-5" />}
                title="Estado actual"
              />

              <FeatureItem
                icon={<Smartphone className="h-5 w-5" />}
                title="Consulta en línea"
              />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Preguntas frecuentes */}
      <section className="border-y bg-muted/30">
        <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
          <div className="text-center">
            <div className="mx-auto w-fit rounded-xl bg-primary/10 p-3 text-primary">
              <HelpCircle className="h-6 w-6" />
            </div>

            <p className="mt-5 text-sm font-semibold uppercase tracking-wider text-primary">
              Preguntas frecuentes
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight">
              Respuestas para preparar tu viaje
            </h2>

            <p className="mt-4 text-muted-foreground">
              Consulta algunas de las preguntas más comunes de los pasajeros.
            </p>
          </div>

          <div className="mt-10 space-y-4">
            {frequentlyAskedQuestions.map((item, index) => (
              <details
                key={item.question}
                className="group rounded-xl border bg-background shadow-sm"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-semibold">
                  <span className="flex items-center gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm text-primary">
                      {index + 1}
                    </span>

                    {item.question}
                  </span>

                  <span className="text-xl text-primary transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>

                <div className="border-t px-5 py-4 text-sm leading-7 text-muted-foreground">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 py-12 md:flex-row md:items-center lg:px-8">
          <div>
            <h2 className="text-2xl font-bold">
              ¿Todavía tienes alguna pregunta?
            </h2>

            <p className="mt-2 max-w-2xl text-primary-foreground/80">
              Comunícate con nuestro equipo y proporciona el código de vuelo
              cuando tu consulta esté relacionada con una operación.
            </p>
          </div>

          <Button asChild size="lg" variant="secondary">
            <Link to="/contacto">
              Contactar soporte
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

interface SectionHeadingProps {
  eyebrow: string
  title: string
  description: string
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="max-w-2xl">
      <p className="text-sm font-semibold uppercase tracking-wider text-primary">
        {eyebrow}
      </p>

      <h2 className="mt-2 text-3xl font-bold tracking-tight">
        {title}
      </h2>

      <p className="mt-4 leading-7 text-muted-foreground">
        {description}
      </p>
    </div>
  )
}

interface TravelStepProps {
  number: string
  icon: ReactNode
  title: string
  description: string
}

function TravelStep({
  number,
  icon,
  title,
  description,
}: TravelStepProps) {
  return (
    <Card className="relative overflow-hidden">
      <span className="absolute right-4 top-2 text-5xl font-bold text-primary/5">
        {number}
      </span>

      <CardHeader className="relative">
        <div className="w-fit rounded-xl bg-primary/10 p-3 text-primary">
          {icon}
        </div>

        <CardTitle className="pt-2 text-lg">
          {title}
        </CardTitle>

        <CardDescription className="leading-6">
          {description}
        </CardDescription>
      </CardHeader>
    </Card>
  )
}

interface ChecklistItemProps {
  title: string
  description: string
}

function ChecklistItem({
  title,
  description,
}: ChecklistItemProps) {
  return (
    <div className="flex items-start gap-3 rounded-lg border bg-muted/20 p-4">
      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

      <div>
        <p className="font-semibold">
          {title}
        </p>

        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  )
}

interface InformationCardProps {
  icon: ReactNode
  title: string
  description: string
  items: string[]
}

function InformationCard({
  icon,
  title,
  description,
  items,
}: InformationCardProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="mb-2 w-fit rounded-xl bg-primary/10 p-3 text-primary">
          {icon}
        </div>

        <CardTitle>
          {title}
        </CardTitle>

        <CardDescription className="leading-6">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ul className="space-y-3">
          {items.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 text-sm text-muted-foreground"
            >
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

interface TimeRecommendationProps {
  title: string
  time: string
  description: string
}

function TimeRecommendation({
  title,
  time,
  description,
}: TimeRecommendationProps) {
  return (
    <div className="rounded-xl border bg-muted/20 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-semibold">
          {title}
        </p>

        <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
          {time}
        </span>
      </div>

      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </div>
  )
}

interface ProcessItemProps {
  number: string
  title: string
  description: string
}

function ProcessItem({
  number,
  title,
  description,
}: ProcessItemProps) {
  return (
    <div className="flex items-start gap-4">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
        {number}
      </span>

      <div>
        <p className="font-semibold">
          {title}
        </p>

        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  )
}

interface FeatureItemProps {
  icon: ReactNode
  title: string
}

function FeatureItem({
  icon,
  title,
}: FeatureItemProps) {
  return (
    <div className="flex items-center gap-3 rounded-lg border bg-background p-4">
      <div className="rounded-lg bg-primary/10 p-2 text-primary">
        {icon}
      </div>

      <p className="text-sm font-semibold">
        {title}
      </p>
    </div>
  )
}