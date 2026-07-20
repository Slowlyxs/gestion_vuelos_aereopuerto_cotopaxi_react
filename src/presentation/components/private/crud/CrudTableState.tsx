import type { ReactNode } from 'react'
import {
  CircleAlert,
  Database,
  Loader2,
  Plus,
  RefreshCw,
} from 'lucide-react'

import { Button } from '@/presentation/components/ui/button'

interface CrudTableStateProps {
  isLoading: boolean
  error?: string | null
  isEmpty: boolean

  children: ReactNode

  loadingMessage?: string
  emptyTitle?: string
  emptyDescription?: string
  emptyIcon?: ReactNode

  createLabel?: string
  onCreate?: () => void
  onRetry?: () => void
}

export default function CrudTableState({
  isLoading,
  error,
  isEmpty,
  children,
  loadingMessage = 'Cargando registros...',
  emptyTitle = 'No hay registros',
  emptyDescription = 'Todavía no existen registros para mostrar.',
  emptyIcon,
  createLabel = 'Crear registro',
  onCreate,
  onRetry,
}: CrudTableStateProps) {
  if (isLoading) {
    return (
      <div className="flex min-h-72 items-center justify-center rounded-xl border bg-card shadow-sm">
        <div className="text-center">
          <Loader2 className="mx-auto h-9 w-9 animate-spin text-primary" />

          <p className="mt-4 text-sm font-medium">
            {loadingMessage}
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            Espera un momento mientras obtenemos la información.
          </p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-72 items-center justify-center rounded-xl border border-destructive/20 bg-card px-6 shadow-sm">
        <div className="max-w-md text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <CircleAlert className="h-7 w-7" />
          </div>

          <h2 className="mt-4 text-lg font-semibold">
            No se pudo cargar la información
          </h2>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {error}
          </p>

          {onRetry && (
            <Button
              type="button"
              variant="outline"
              className="mt-6"
              onClick={onRetry}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Intentar nuevamente
            </Button>
          )}
        </div>
      </div>
    )
  }

  if (isEmpty) {
    return (
      <div className="flex min-h-72 items-center justify-center rounded-xl border border-dashed bg-card px-6 shadow-sm">
        <div className="max-w-md text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            {emptyIcon ?? <Database className="h-8 w-8" />}
          </div>

          <h2 className="mt-5 text-lg font-semibold">
            {emptyTitle}
          </h2>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {emptyDescription}
          </p>

          {onCreate && (
            <Button
              type="button"
              className="mt-6"
              onClick={onCreate}
            >
              <Plus className="mr-2 h-4 w-4" />
              {createLabel}
            </Button>
          )}
        </div>
      </div>
    )
  }

  return <>{children}</>
}