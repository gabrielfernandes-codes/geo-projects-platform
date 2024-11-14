export { eq } from 'drizzle-orm'

export function onUpdateCallback() {
  return new Date()
}
