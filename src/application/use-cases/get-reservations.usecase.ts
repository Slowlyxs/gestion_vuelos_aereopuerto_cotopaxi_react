import { reservationFactory } from '@/infrastructure/factories/reservation.factory'

export async function getReservationsUseCase() {
  return await reservationFactory.getAll()
}