import Fastify from 'fastify'

import { module as moduleProjects } from '../modules/projects/loader'
import { loadHttpSchemaPlugin } from '../plugins/http-schema.plugin'
import { loadServerEnvironmentsPlugin } from '../plugins/server-environments.plugin'

const modules = [moduleProjects]

export async function createStatefulServer(port: number = 3000, host: string = '0.0.0.0'): Promise<void> {
  try {
    const instance = Fastify()

    await instance.register(loadHttpSchemaPlugin)
    await instance.register(loadServerEnvironmentsPlugin)

    await instance.after()

    modules.forEach((plugin) => void instance.register(plugin.callback, plugin.options || {}))

    await instance.ready()

    await instance.listen({
      port,
      host,
    })

    const protocol = instance.initialConfig.https ? 'https' : 'http'

    console.log(`Server is running on ${protocol}://${host}:${port}`)

    const shutdown = async () => {
      console.log('Shutting down gracefully...')

      try {
        await instance.close()

        process.exit(0)
      } catch (error) {
        console.error('Error during shutdown', error)
        process.exit(1)
      }
    }

    process.on('SIGINT', shutdown)
    process.on('SIGTERM', shutdown)
  } catch (error) {
    console.error('Error starting the server:', error)
    process.exit(1)
  }
}
