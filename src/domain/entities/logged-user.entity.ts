export interface LoggedUser {
  user_id: number
  username: string
  email: string
  is_staff: boolean
  role: string | null
  saldo: number
}