export type LOG_LEVELS = 'debug' | 'error' | 'info' | 'warning' | 'critical'

export interface Logger {
  debug(message: string, ...args: unknown[]): void
  error(message: string, ...args: unknown[]): void
  info(message: string, ...args: unknown[]): void
  warning(message: string, ...args: unknown[]): void
}

export interface LoggerConfiguration {
  level: LOG_LEVELS
  prettyPrint: boolean
}
