import { Server } from 'http'
import { AddressInfo } from 'net'
import express from 'express'
import * as configurationProvider from '../../../../libraries/configurator'
import configurationSchema from '../../config'

let connection: Server

async function startWebServer(): Promise<AddressInfo> {
  configurationProvider.initialize(configurationSchema)
  const expressApp = express()
  const APIAdress = await openConnection(expressApp)
  return APIAdress
}

async function stopWebServer() {
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
    // console.log(`Server is about to listen to port ${webServerPort}`)
    connection = expressApp.listen(webServerPort, () => {
      resolve(connection.address() as AddressInfo)
    })
  })
}

export { startWebServer, stopWebServer }
