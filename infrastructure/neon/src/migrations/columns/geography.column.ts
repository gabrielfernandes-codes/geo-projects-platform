import { customType } from 'drizzle-orm/pg-core'

export const geography = customType<{
  data: Date
  config: { type?: string; srid?: number }
}>({
  dataType(config) {
    return `geography(${config?.type || 'Point'}, ${config?.srid || 4326})`
  },
})
