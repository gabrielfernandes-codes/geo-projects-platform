const drizzleKit = require('drizzle-kit')

module.exports = drizzleKit.defineConfig({
  dialect: 'postgresql',
  schema: './src/schemas',
  out: './src/migrations',
  entities: {
    roles: {
      provider: 'neon',
    },
  },
  migrations: {
    prefix: 'timestamp',
    table: 'migrations',
    schema: 'public',
  },
  breakpoints: false,
  dbCredentials: {
    url: process.env.POSTGRES_DSN,
  },
  extensionsFilters: ['postgis'],
})
