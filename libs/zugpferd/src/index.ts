import { getLogger } from '@e-invoice/logging'

const log = getLogger('zugpferd')

export class ApiAnalytics {
  // This is here to highlight tsconfig.json behaviour,
  // consider it part of code we haven't had time to clean up yet
  uninitializedProperty: string

  foundAllUsers (ip: string, length: number) {
    log.info('found all users', { ip, numUsers: length, timestamp: Date.now() })
  }
}
