// reservation.factory.ts

import { reservationService } from '../services/reservation.service'

export const reservationFactory = {

  getAll: () =>
    reservationService.getAll(),

  create: (
    vuelo: number,
    cantidad: number
  ) =>
    reservationService.create(
      vuelo,
      cantidad
    ),
}