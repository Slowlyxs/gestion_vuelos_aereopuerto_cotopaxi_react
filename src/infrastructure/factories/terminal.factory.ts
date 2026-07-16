import { getTerminalsUseCase } from '@/application/use-cases/get-terminals.usecase'

export const terminalFactory = {
  getAll: getTerminalsUseCase,
}