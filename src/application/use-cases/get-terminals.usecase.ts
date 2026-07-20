import { terminalService } from '@/infrastructure/services/terminal.service'

export async function getTerminalsUseCase() {
  return await terminalService.getAll()
}