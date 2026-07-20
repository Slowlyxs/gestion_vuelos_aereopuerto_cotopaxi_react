import { createTerminalUseCase } from '@/application/use-cases/create-terminal.usecase'
import { deleteTerminalUseCase } from '@/application/use-cases/delete-terminal.usecase'
import { getTerminalsUseCase } from '@/application/use-cases/get-terminals.usecase'
import { updateTerminalUseCase } from '@/application/use-cases/update-terminal.usecase'

export const terminalFactory = {
  getAll: getTerminalsUseCase,
  create: createTerminalUseCase,
  update: updateTerminalUseCase,
  remove: deleteTerminalUseCase,
}