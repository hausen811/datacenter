import rp from 'request-promise'
const LRU = require('lru-cache')
let cache = LRU({
  max: 1000,
  maxAge: 1000*60
})
export function createAPI () {
  let api = {}
  api.isServer = true

  api.getAllResultData = function (url) {
    if (cache && cache.has(url)) {
      return Promise.resolve(cache.get(url))
    } else {
      return new Promise((resolve, reject) => {
        return rp({
          uri: url,
          json: true // Automatically parses the JSON string in the response
        }).then(res=>{
          const val = res
          if (val) val.__lastUpdated = Date.now()
          cache && cache.set(url, val)
          resolve(val)
        }).catch(reject)
      })
    }
  }
  return api
}
