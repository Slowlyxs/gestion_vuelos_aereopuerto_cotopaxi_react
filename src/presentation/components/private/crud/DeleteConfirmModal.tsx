import { Loader2, Trash2 } from 'lucide-react'

import { Button } from '@/presentation/components/ui/button'

interface DeleteConfirmModalProps {
  open: boolean
  title?: string
  description: string
  isDeleting?: boolean
  onCancel(): void
  onConfirm(): void
}

export default function DeleteConfirmModal({
  open,
  title = 'Eliminar registro',
  description,
  isDeleting = false,
  onCancel,
  onConfirm,
}: DeleteConfirmModalProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <button
        type="button"
        aria-label="Cancelar eliminación"
        className="absolute inset-0"
        onClick={onCancel}
      />

      <div className="relative z-10 w-full max-w-md rounded-2xl border bg-background p-6 shadow-2xl">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
          <Trash2 className="h-5 w-5" />
        </div>

        <h2 className="mt-5 text-xl font-bold">
          {title}
        </h2>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {description}
        </p>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            disabled={isDeleting}
            onClick={onCancel}
          >
            Cancelar
          </Button>

          <Button
            type="button"
            variant="destructive"
            disabled={isDeleting}
            onClick={onConfirm}
          >
            {isDeleting && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}

            Eliminar
          </Button>
        </div>
      </div>
    </div>
  )
}