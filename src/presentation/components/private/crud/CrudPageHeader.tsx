import type { ReactNode } from 'react'
import { Plus } from 'lucide-react'

import { Button } from '@/presentation/components/ui/button'

interface CrudPageHeaderProps {
  title: string
  description: string
  icon: ReactNode
  buttonLabel?: string
  onCreate(): void
}

export default function CrudPageHeader({
  title,
  description,
  icon,
  buttonLabel = 'Nuevo registro',
  onCreate,
}: CrudPageHeaderProps) {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-primary/10 p-3 text-primary">
          {icon}
        </div>

        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {title}
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            {description}
          </p>
        </div>
      </div>

      <Button onClick={onCreate}>
        <Plus className="mr-2 h-4 w-4" />
        {buttonLabel}
      </Button>
    </div>
  )
}