import { Server } from 'http'
import { AddressInfo } from 'net'
import express from 'express'
import { initializeConfig, getConfigValue } from 'configurator'
import configurationSchema from '../../config'

let connection: Server

async function startWebServer(): Promise<AddressInfo> {
  initializeConfig(configurationSchema)
  const expressApp = express()

  expressApp.get('/', (req, res) => {
    res.send('Hello World!')
  })

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
    const portToListenTo = getConfigValue('port')
    const webServerPort = portToListenTo || 0
    // console.log(`Server is about to listen to port ${webServerPort}`)
    connection = expressApp.listen(webServerPort, () => {
      resolve(connection.address() as AddressInfo)
    })
  })
}

export { startWebServer, stopWebServer }
