import { useEffect, useState } from 'react'
import { Toaster } from 'sonner'

import AppRouter from '@/presentation/router/AppRouter'
import SplashPage from '@/presentation/pages/SplashPage'

import { useAuthStore } from '@/presentation/store/auth.store'

export default function App() {
  const [showSplash, setShowSplash] = useState(true)

  const loadSession = useAuthStore(
    (state) => state.loadSession,
  )

  useEffect(() => {
    loadSession()

    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [loadSession])

  if (showSplash) {
    return <SplashPage />
  }

  return (
    <>
      <AppRouter />
      <Toaster richColors position="top-center" />
    </>
  )
}