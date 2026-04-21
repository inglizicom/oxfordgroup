/** Hash links that work on GitHub Pages (with base) and in dev. */
export function withHomeHash(id) {
  const b = import.meta.env.BASE_URL
  const prefix = b === '/' ? '' : b.replace(/\/$/, '')
  return `${prefix}/#${id}`.replace(/\/\/#/, '/#')
}
