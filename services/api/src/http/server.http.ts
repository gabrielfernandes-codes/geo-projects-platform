import { createInstance } from '../core/instance.core'
import { module as moduleProjects } from '../modules/projects/loader'
import { module as moduleHealthcheck } from '../modules/healthcheck/loader'

const modules = [moduleProjects, moduleHealthcheck]

export async function startStatefulServer(port: number = 3000, host: string = '0.0.0.0'): Promise<void> {
  const instance = await createInstance(modules)

  try {
    await instance.listen({ port, host })
  } catch (error) {
    process.exit(1)
  }

  const shutdown = async () => {
    try {
      await instance.close()

      process.exit(0)
    } catch (error) {
      process.exit(1)
    }
  }

  process.on('SIGINT', shutdown)
  process.on('SIGTERM', shutdown)
}
