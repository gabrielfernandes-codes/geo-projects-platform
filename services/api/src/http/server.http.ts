import { createInstance } from '../core/instance.core'
import { module as moduleProjects } from '../modules/projects/loader'

const modules = [moduleProjects]

export async function startStatefulServer(port: number = 3000, host: string = '0.0.0.0'): Promise<void> {
  const instance = await createInstance(modules)

  try {
    const protocol = instance.initialConfig.https ? 'https' : 'http'

    await instance.listen({ port, host })

    console.log(`Server is running on ${protocol}://${host}:${port}`)
  } catch (error) {
    process.exit(1)
  }

  const shutdown = async () => {
    try {
      await instance.close()

      console.log('Server closed successfully.')
      process.exit(0)
    } catch (error) {
      process.exit(1)
    }
  }

  process.on('SIGINT', shutdown)
  process.on('SIGTERM', shutdown)
}
