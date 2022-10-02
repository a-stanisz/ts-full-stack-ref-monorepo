import { logger } from 'logger'
import { errorHandler, AppError } from 'error-handler'

import { start } from '..'

start()
  .then((startResponses) => {
    logger.info(`The app has started successfully ${startResponses}`)
  })
  .catch((error) => {
    errorHandler.handleError(
      new AppError('Startup failure', error.message, 500, false, error)
    )
  })
