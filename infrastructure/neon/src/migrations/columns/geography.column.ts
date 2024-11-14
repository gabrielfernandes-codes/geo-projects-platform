import { customType } from 'drizzle-orm/pg-core'

export function geography(name: string, options?: { type?: string; srid?: number }) {
  const { type = 'Point', srid = 4326 } = options || {}

  return customType<{ data: string }>({
    dataType() {
      return `geography(${type}, ${srid})`
    },
  })(name)
}
