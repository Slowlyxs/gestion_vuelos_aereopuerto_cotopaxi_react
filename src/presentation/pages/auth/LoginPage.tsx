// src/presentation/pages/auth/LoginPage.tsx

import { useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { z } from 'zod'
import { Loader2, Plane } from 'lucide-react'

import { useAuthStore } from '@/presentation/store/auth.store'

import { Button } from '@/presentation/components/ui/button'
import { Input } from '@/presentation/components/ui/input'
import { Label } from '@/presentation/components/ui/label'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/presentation/components/ui/card'


// ─── Schema ───────────────────────────────────────────────

const loginSchema = z.object({
  username: z
    .string()
    .min(3, 'El usuario debe tener al menos 3 caracteres'),

  password: z
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres'),
})


type LoginFormData = z.infer<typeof loginSchema>



// ─── Component ────────────────────────────────────────────

export default function LoginPage() {

  const navigate = useNavigate()

  const location = useLocation()


  /**
   * Si viene de una ruta protegida,
   * vuelve ahí.
   *
   * Si entra normalmente al login,
   * va al dashboard privado.
   */
  const from =
    (location.state as { from?: Location })?.from?.pathname
    ?? '/private/dashboard'



  const {
    login,
    isLoading,
    error,
    clearError,
    user,

  } = useAuthStore()



  // Si ya tiene sesión activa
  useEffect(() => {

    if(user){

      navigate(
        '/private/dashboard',
        {
          replace:true
        }
      )

    }

  },[
    user,
    navigate
  ])




  const {
    register,
    handleSubmit,
    formState:{
      errors
    }

  } = useForm<LoginFormData>({

    resolver:zodResolver(loginSchema)

  })




  async function onSubmit(
    data:LoginFormData
  ){

    clearError()


    try {


      await login(
        data.username,
        data.password
      )


      navigate(
        from,
        {
          replace:true
        }
      )


    }catch{

      // El error ya está manejado en auth.store

    }

  }





  return (

    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">


      <Card className="w-full max-w-sm">


        <CardHeader className="text-center">


          <div className="flex justify-center mb-2">

            <div className="flex items-center justify-center rounded-full bg-primary p-3 text-primary-foreground">

              <Plane className="h-6 w-6"/>

            </div>

          </div>


          <CardTitle className="text-2xl">
            Cotopaxi Airlines
          </CardTitle>


          <CardDescription>
            Ingresa al sistema administrativo
          </CardDescription>


        </CardHeader>



        <form
          onSubmit={
            handleSubmit(onSubmit)
          }
          noValidate
        >


          <CardContent className="space-y-4">


            {
              error && (

                <div className="rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">

                  {error}

                </div>

              )
            }




            <div className="space-y-1">


              <Label htmlFor="username">
                Usuario
              </Label>


              <Input

                id="username"

                type="text"

                autoComplete="username"

                placeholder="usuario"

                aria-invalid={
                  !!errors.username
                }

                {...register('username')}

              />



              {
                errors.username && (

                  <p className="text-xs text-destructive">

                    {errors.username.message}

                  </p>

                )
              }


            </div>





            <div className="space-y-1">


              <Label htmlFor="password">
                Contraseña
              </Label>


              <Input

                id="password"

                type="password"

                autoComplete="current-password"

                placeholder="••••••••"

                aria-invalid={
                  !!errors.password
                }

                {...register('password')}

              />



              {
                errors.password && (

                  <p className="text-xs text-destructive">

                    {errors.password.message}

                  </p>

                )
              }


            </div>


          </CardContent>




          <CardFooter className="flex flex-col gap-4">


            <Button

              type="submit"

              className="w-full"

              disabled={isLoading}

            >

              {
                isLoading ? (

                  <>

                    <Loader2 className="mr-2 h-4 w-4 animate-spin"/>

                    Iniciando sesión...

                  </>

                ) : (

                  'Ingresar'

                )
              }


            </Button>




            <p className="text-center text-sm text-muted-foreground">

              ¿No tienes cuenta?{' '}


              <Link

                to="/register"

                className="font-medium text-primary hover:underline"

              >

                Regístrate

              </Link>


            </p>



          </CardFooter>


        </form>


      </Card>


    </div>

  )

}