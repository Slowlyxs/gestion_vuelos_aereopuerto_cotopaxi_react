import { terminalService } from "@/infrastructure/services/terminal.service.ts"

export async function getTerminalsUseCase() {
  return await terminalService.getAll()
}