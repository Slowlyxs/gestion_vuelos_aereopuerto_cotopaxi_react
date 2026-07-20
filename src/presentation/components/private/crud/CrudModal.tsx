import type { FormEvent, ReactNode } from 'react'
import { Loader2, X } from 'lucide-react'

import { Button } from '@/presentation/components/ui/button'

interface CrudModalProps {
  open: boolean
  title: string
  description?: string
  isSaving?: boolean
  submitLabel?: string
  children: ReactNode
  onClose(): void
  onSubmit(event: FormEvent<HTMLFormElement>): void
}

export default function CrudModal({
  open,
  title,
  description,
  isSaving = false,
  submitLabel = 'Guardar',
  children,
  onClose,
  onSubmit,
}: CrudModalProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <button
        type="button"
        aria-label="Cerrar modal"
        className="absolute inset-0"
        onClick={onClose}
      />

      <div className="relative z-10 max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border bg-background shadow-2xl">
        <div className="sticky top-0 z-10 flex items-start justify-between border-b bg-background px-6 py-5">
          <div>
            <h2 className="text-xl font-bold">
              {title}
            </h2>

            {description && (
              <p className="mt-1 text-sm text-muted-foreground">
                {description}
              </p>
            )}
          </div>

          <Button
            type="button"
            size="icon"
            variant="ghost"
            disabled={isSaving}
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <form onSubmit={onSubmit}>
          <div className="space-y-5 p-6">
            {children}
          </div>

          <div className="sticky bottom-0 flex flex-col-reverse gap-3 border-t bg-background px-6 py-4 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              disabled={isSaving}
              onClick={onClose}
            >
              Cancelar
            </Button>

            <Button
              type="submit"
              disabled={isSaving}
            >
              {isSaving && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}

              {submitLabel}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}