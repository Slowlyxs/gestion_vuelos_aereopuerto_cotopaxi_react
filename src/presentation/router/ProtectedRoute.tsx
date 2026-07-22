import { type ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/presentation/store/auth.store'
import { canAccess, hasPrivilegedAccess } from '@/infrastructure/config/permissions'

interface ProtectedRouteProps {
  children: ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const location = useLocation()
  const user = useAuthStore((state) => state.user)
  const isLoading = useAuthStore((state) => state.isLoading)

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (!hasPrivilegedAccess(user)) {
    return <Navigate to="/" replace />
  }

  if (!canAccess(user, location.pathname)) {
    return <Navigate to="/private/dashboard" replace />
  }

  return <>{children}</>
}