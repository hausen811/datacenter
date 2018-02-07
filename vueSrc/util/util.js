/**
 * Created by 15030625 on 2017/9/28.
 */
export const jsonClone = function(obj) {
  return JSON.parse(JSON.stringify(obj));
}
export const urlToQuery = (url)=>{
  let query = {}
  if(url.split('?')[1]){
    url.split('?')[1].split('&').forEach(q=>{
      query[q.split('=')[0]] =decodeURIComponent(q.split('=')[1])
    })
  }
  return query
}

export const dataToUrl = (data)=>{
  let url = '?'
  for(let key in data){
    data[key]&&(url += (key+'='+data[key]+'&'))
  }
  return url.substring(0,url.length-1)
}
export const dataToUrlWithCode = (data)=>{
  let url = '?'
  for(let key in data){
    data[key]&&(url += (key+'='+encodeURIComponent(data[key])+'&'))
  }
  return url.substring(0,url.length-1)
}

export const htmlEncode= (c)=> {
  if(c){
    c = c.replace(/&/g,'&amp;')
    c = c.replace(/</g,'&lt;')
    c = c.replace(/>/g,'&gt;')
    c = c.replace(/"/g,'&quot;')
    c = c.replace(/ /g,' ')
  }
  return c
}