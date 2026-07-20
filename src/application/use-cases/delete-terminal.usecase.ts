import { terminalService } from '@/infrastructure/services/terminal.service'

export async function deleteTerminalUseCase(
  id: number,
) {
  await terminalService.remove(id)
}