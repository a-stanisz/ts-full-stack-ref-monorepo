import { logger } from 'logger'
import { errorHandler, AppError } from 'error-handler'
import { startWebServer } from './entry-points/api/server'

async function start() {
  return Promise.all([startWebServer()])
}

start()
  .then((startResponses) => {
    logger.info(`The app has started successfully ${startResponses}`)
  })
  .catch((error) => {
    errorHandler.handleError(
      new AppError('Startup failure', error.message, 500, false, error)
    )
  })
