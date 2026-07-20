import type { TerminalPayload } from '@/domain/entities/terminal.entity'

import { terminalService } from '@/infrastructure/services/terminal.service'

export async function updateTerminalUseCase(
  id: number,
  payload: TerminalPayload,
) {
  return await terminalService.update(id, payload)
}