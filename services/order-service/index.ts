import { startWebServer } from './entry-points/api/server'

async function start() {
  return Promise.all([startWebServer()])
}

export default start
