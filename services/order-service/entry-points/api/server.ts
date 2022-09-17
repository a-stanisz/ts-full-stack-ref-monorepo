import { Server } from 'http'
import { AddressInfo } from 'net';
import express from 'express'

let connection: Server

async function startWebServer(): Promise<AddressInfo> {
  const expressApp = express()
  const APIAdress = await connection.(expressApp)
  return APIAdress
}

async function stopWebServer(): Promise<AddressInfo> {
  return new Promise<void>((resolve) => {
    if (connection !== undefined) {
      connection.close(() => {
        resolve()
      })
    }
  })
}

async function openConnection(
  expressApp: express.Application
): Promise<AddressInfo> {
  return new Promise((resolve) => {
    const portToListenTo = configurationProvider.getValue('port')
    const webServerPort = portToListenTo || 0
    logger.info(`Server is about to listen to port ${webServerPort}`)
    connection = expressApp.listen(webServerPort, () => {
      errorHandler.listenToErrorEvents(connection);
      resolve(connection.address() as AddressInfo);
    });
  });
}
