import axios from 'axios'

export function createAPI () {
  let api = {}
  api.isServer = false
  api.getAllResultData = function (url) {
    return new Promise((resolve,reject)=>{
      return axios.get(url).then(res=>{
        resolve(res.data)
      }).catch(reject)
    })
  };
  api.Get = function(url){
    return new Promise((resolve,reject)=>{
      return axios.get(url).then(res=>{
        resolve(res.data)
      }).catch(reject)
    })
  }
  return api
}
