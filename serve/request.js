
const author = require("./author.js")
const SignHeader = require("./signHeader.js")
const config = require("../config/config.js")
let Raven = require("../common/raven/raven.js")



// 1.检查网络状态
const checkNetStatus= function(res){
  if (res.statusCode == 200) {
    return true
  } else {
    return false
  }
}

// 2.处理登录异常
//  1009 没有授权渠道
//  3005 没有找到该用户
//  1005 token 失效
//  1006 token 失效
const handleLoginError=function(res){
  if (res.code == 205 && ([1006,1005,3005,1009,1000].indexOf(res.exception.errorCode)) > -1) {
    return true
  } else {
    return false
  }
}

// 请求数据
const request = function(method, url, params = {}){
  return new Promise((resolve, reject) => {
    var token = wx.$db.token
    if((token == "" || token == null) && !params.noNeedLogin){
      wx.hideLoading()
      author.login()
      return
    }
    var data = params
    if (data == null) {
      data = {}
    }
    let header = SignHeader(params, token)
    header.accessToken = token
    wx.request({
      url: config.baseUrl+url,
      header: header,
      method: method,
      data: data,
      dataType: "json",
      success: (data) => {
        if (checkNetStatus(data)) {
          let res = data.data
          if (!handleLoginError(res)) {
            if (res.code == 201) {
              resolve(res)
            } else {
              let msg = res.exception.message
              if (res.exception.message.indexOf("@@@") > -1){
                msg = res.exception.message.split('@@@')[1]
              }
              if(params.pass){
                res.exception.message = msg
                reject && reject(data)
              }else{
                wx.$showToast(msg)
                reject && reject(data)
              }
            }
          }else{
            // 用户登录状态失效 发起登录
            wx.$do.db.set("token",null)
            author.login()
            wx.hideLoading()
          }
        }else{
          console.log("--------",data)
          if (data.statusCode==500){
            Raven.captureBreadcrumb({
              category: 'ajax',
              data: {
                method: 'post',
                url: config.baseUrl + url,
                status_code: 500
              }
            })
          }
          wx.$do.toast.message("~系统正在维护中,请稍后~")
        }
      },
      fail: function (err) {
        console.log("dddd",err)
        
        wx.$do.toast.message("请检查手机网络")
      }
    })
  })
}

// 4.拼接路径
const generateMatchApi = function(api, querys) {
  // 第一步查找路径中的参数名
  var matchs = api.match(/\{[^\}]+\}/g);
  if (matchs == null) {
    return api
  }
  var params = matchs.map(res => {
    return res.replace(/\{/g, '').replace(/\}/g, '')
  })

  var result = api
  // 替换掉路径中参数名
  for (var i in matchs) {
    var key = params[i]
    if (querys == null) {
      console.log("querys为空")
      return api
    }
    var value = querys[key]
    if (value == null) {
      console.log("api:" + api + "参数:" + key + "缺失")
    }
    result = result.replace(new RegExp(matchs[i], "g"), value)
  }
  return result
}


module.exports = {


  // 检查网路状态
  // get 请求
  get(api,params,querys){
    var path = generateMatchApi(api,querys)
    return request("GET",path,params)
  },


  // post 请求
  post(api, params, querys){
    var path = generateMatchApi(api, querys)
    params.version = config.apiVersion
    return request("POST", path, params)
  },

  // 权限post
  postUsingAuthor(api, params, querys) {
    if (wx.$db.userType != 2) {
      wx.hideLoading()
      let pages = getCurrentPages()
      let sourceUrl = ""
      if (pages.length > 0) {
        console.log(pages[0])
        let query = []
        for (let k in pages[0].options) {
          query.push(`${k}=${pages[0].options[k]}`)
        }
        sourceUrl = pages[0].route + "?" + query.join("&")
      }
      wx.navigateTo({
        url: `/pages/author/author?sourceUrl=${sourceUrl}`,
      })
      return new Promise((resolve, reject) => {
      })
    } else {
      var path = generateMatchApi(api, querys)
      params.version = config.apiVersion
      return request("POST", path, params)
    }
  },

  // PUT 请求
  put(api, params, querys){
    var path = generateMatchApi(api, querys)
    return request("PUT", path, params)
  },

  // 删除操作
  delete(api, params, querys){
    var path = generateMatchApi(api, querys)
    return request("DELETE", path, params)
  },

  // 上传文件
  upload(url,filePath,params={}){
    var token = wx.$db.token
    let header = SignHeader({}, token)
    header['Content-type'] = 'multipart/form-data'

    if(filePath==null||filePath==''){
       wx.$do.toast.message("filePath is Null")
       return
    }
    if(url==null||url==''){

      wx.$do.toast.message("url is Null or empty")
      return
    }

    return new Promise(function (resolve, reject){
      wx.uploadFile({
        url: url, 
        filePath: filePath,
        name: 'file',
        header: header,
        formData: params,
        success: function (data) {
          if (checkNetStatus(data)) {
            let res = JSON.parse(data.data) 
            if (!handleLoginError(res)) {
              if (res.code == 0) {
                resolve(res)
              } else {
                wx.$do.toast.message(res.exception.message)
                reject(data)
              }
            }else{
              reject(data)
            }
          }else{
            reject(data)
          }
       
        },fail:function(err){
           reject(err)
        }
      })
    })
  }
}