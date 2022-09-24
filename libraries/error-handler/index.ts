import * as Http from 'http'
import * as util from 'util'
import { logger } from 'logger'

let httpServerRef: Http.Server

const errorHandler = {
  listenToErrorEvents: (httpServer: Http.Server) => {
    httpServerRef = httpServer

    process.on('uncaughtException', async (error) => {
      await errorHandler.handleError(error)
    })

    process.on('unhandledRejection', async (reason) => {
      await errorHandler.handleError(reason)
    })

    process.on('SIGTERM', async () => {
      logger.error(
        'SIGTERM event received. Trying to gracefully close the server...'
      )
      await terminateHttpServerAndExit()
    })

    process.on('SIGINT', async () => {
      logger.error(
        'SIGINT event received. Trying to gracefully close the server...'
      )
      await terminateHttpServerAndExit()
    })
  },

  handleError: (errorToHandle: unknown) => {
    try {
      const appError: AppError = normalizeError(errorToHandle)
      logger.error(appError.message, appError)
      if (!appError.isTrusted) {
        terminateHttpServerAndExit()
      }
    } catch (failure: unknown) {
      process.stdout.write(
        'The Error Handler failed. Below find its failure and the error it tried to handle.'
      )
      process.stdout.write(JSON.stringify(failure))
      process.stdout.write(JSON.stringify(errorToHandle))
    }
  },
}

const terminateHttpServerAndExit = async () => {
  if (httpServerRef) {
    await httpServerRef.close()
  }
  process.exit()
}

const normalizeError = (errorToHandle: unknown): AppError => {
  if (errorToHandle instanceof AppError) {
    return errorToHandle
  }
  if (errorToHandle instanceof Error) {
    const appError = new AppError(errorToHandle.name, errorToHandle.message)
    appError.stack = errorToHandle.stack
    return appError
  }
  const inputType = typeof errorToHandle
  return new AppError(
    'general-error',
    `The Error Handler has received a none-error instance with the type of "${inputType}" and a value of "${util.inspect(
      errorToHandle
    )}".`
  )
}

class AppError extends Error {
  constructor(
    public name: string,
    public message: string,
    public httpStatus: number = 500,
    public isTrusted = true,
    public cause?: unknown
  ) {
    super(message)
  }
}

export { errorHandler, AppError }
