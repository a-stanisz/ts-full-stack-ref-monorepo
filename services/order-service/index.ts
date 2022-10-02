import { startWebServer } from './entry-points/api/server'

export async function start() {
  return Promise.all([startWebServer()])
}
