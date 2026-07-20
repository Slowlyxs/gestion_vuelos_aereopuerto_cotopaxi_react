import type { TerminalPayload } from '@/domain/entities/terminal.entity'

import { terminalService } from '@/infrastructure/services/terminal.service'

export async function createTerminalUseCase(
  payload: TerminalPayload,
) {
  return await terminalService.create(payload)
}