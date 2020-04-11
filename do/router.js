const path = require("./path");

function push(url, data){
  wx.navigateTo({
    url: url + '?' + jsonToUrlEncode(data)
  })
}
function replace(url,data){
  wx.redirectTo({
    url: url + '?' + jsonToUrlEncode(data)
  })
}
function jsonToUrlEncode(object){
  let results = []
  for(let i in object){
     results.push(`${i}=${object[i]}`)
  }
  return results.join('&')
  
}

function reLaunch(url,data){
  wx.reLaunch({
    url: url + '?' + jsonToUrlEncode(data)
  })
}





// 0 跳转到tab页面

function switchTab(item) {
  let parseQuerys = path(item.link).querys()
  for (let key in parseQuerys) {
    wx.setStorageSync(key, parseQuerys[key])
  }
  wx.switchTab({
    url: item.link,
  })

}



/**
 *  打开webview
 *  url 网页地址 
 */
function openWebview(url){
  let link = encodeURI(url)
  push("/packageA/pages/webview/webview", { src: link })
}



/**
 * 打开其他小程序 
 * @param appId 其它小程序id
 * @param path 其它小程序路径 
 */
function launchMiniProgram({appId,path}) {
  wx.navigateToMiniProgram({
    appId: appId,
    path: path,
    envVersion: config.envVersion
  })
}
 
module.exports = {
   push,
   reLaunch,
   replace,
   switchTab,
   launchMiniProgram,
   openWebview
}