import { reservationFactory } from '@/infrastructure/factories/reservation.factory'

export async function createReservationUseCase(
  vuelo: number,
  cantidad: number,
) {
  return await reservationFactory.create(vuelo, cantidad)
}