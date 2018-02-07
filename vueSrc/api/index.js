// this is aliased in webpack config based on server/client build
import { createAPI } from 'create-api'
import {dataToUrlWithCode,jsonClone} from '../util/util'
const api = createAPI()

export function getAllResultData (data,host,config) {
  let dataUrl = dataToUrlWithCode(data)
  let url,startDate = Date.now()
  if(api.isServer){
    let path = require('path').join(__dirname,'src/api/index')
    url = host+'/emall/hk/pc/search.json'+dataUrl
    process.env.NODE_ENV == 'development'&&console.log(`[INFO] ${config.uuid} 搜索主接口请求开始：${url} API: ${path}:getAllResultData`)
  }else{
    url = config.hostname.api+'/proxy/searchconfig.ebuy/emall/hk/pc/search.json'+dataUrl
  }

  return api.getAllResultData(url).then(res=>{
    let endTime = Date.now() - startDate
    process.env.NODE_ENV == 'development'&&console.log(`[INFO] ${config.uuid} 耗时 ${endTime}ms 搜索主接口请求结束：${url} API: getAllResultData`)
    return Promise.resolve(jsonClone(res))
  }).catch(error=>{
    return Promise.reject(error)
  })
}
export function getPrice(data,custno,config){
  let url = `${config.hostname.api}/proxy/searchconfig.dsServer/ds/generalForHk/${data}-HK4-2--1-${custno}-.json`;
  return api.Get(url)
}
export function addHistory(data,config){
  function resolveHisKey(str) {
    str = str.replace(/\%/g, "%25").replace(/\-/g, "%2d").replace(/\+/g, "%2B").replace(/\~/g, "%7E");
    return str;
  }
  let userId = $.cookie("custno")|| "";
  if(userId === ""){
    return;
  }
  let chineseRegex = /[^\x00-\xff]/g;
  let strLength = data.keyword.replace(chineseRegex, "**").length;
  if (data.keyword.length == 0 || strLength > 30) {
    return;
  }
  let url = `${config.hostname.api}/proxy/searchconfig.dsServer/ds/his/ext/add/${userId}-${encodeURIComponent(resolveHisKey(data.keyword))}-7-addHistory_${MD5(userId + "+add")}.jsonp`;
  api.Get(url)
}

