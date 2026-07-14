// src/App.tsx — SOLO PARA VERIFICACIÓN, eliminar después
import { useEffect } from 'react'
import AppRouter from './presentation/router/AppRouter'
import { apiClient } from './infrastructure/http/axios-client'
import { Toaster } from 'sonner'


export default function App() {
  useEffect(() => {
    apiClient.get('/products/').then((res) => {
      console.log('[apiClient] Productos:', res.data)
    }).catch((err) => {
      console.error('[apiClient] Error:', err)
    })
  }, [])

  return (
    <>
      <AppRouter />
      <Toaster richColors position="top-right" />
    </>
  )
}