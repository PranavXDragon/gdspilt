import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
function createRemoteCollection(fetchEndpoint) {
  let _cache
  return async () => {
    if (_cache)
      return _cache
    const res = await fetch(fetchEndpoint).then(r => r.json())
    _cache = res
    return res
  }
}

export const collections = {
  'fa6-brands': () => require('@iconify-json/fa6-brands/icons.json'),
  'heroicons': () => require('@iconify-json/heroicons/icons.json'),
}