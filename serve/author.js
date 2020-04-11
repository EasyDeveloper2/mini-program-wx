

var api = require("./api.js")
var SignHeader = require("./signHeader.js")
const config = require("../config/config.js")
let isLogining = false

module.exports = {

  /**
   * 获取当前页面的原路径参数 
   */
  getFromPageData(){
    let sourceUrl = ''
    let pages = getCurrentPages()
    if (pages.length > 0) {
      console.log(pages[0])
      let query = []
      for (let k in pages[0].options) {
        query.push(`${k}=${pages[0].options[k]}`)
      }
      sourceUrl = pages[0].route + "?" + query.join("&")
    }
    return sourceUrl
  },
  /**
   * 授权登录 
   */
  login() {
    if(isLogining){
      return new Promise((resolve,reject)=>{
        
      })
    }
    isLogining = true
    var that = this;
    return new Promise((resolve, reject) => {
      wx.login({
        success: e => {
          
          var params = {
            'channel': 2,
            'sourceUrl': getFromPageData(),
            'code': e.code,//e.code
          }
          // 调用登录接口
          that.requestLogin(params).then(res => {
            isLogining = false
            resolve(res)
            if (res.code == "201") {
           
              //  登录成功需要通知当前页面
              let pages = getCurrentPages()
              if (pages.length > 0 && pages[0].onFinishLogin) {
                pages[0].onFinishLogin()
                console.log(pages)
              } else if (pages.length > 0) {
                wx.$router.reLaunch("/" + pages[0].route, pages[0].options)
              }
            }
          }).catch(err => {
            reject && reject(err)
            isLogining = false
          })
        }
      })
    })

  },

  // 请求登录
  requestLogin(params) {
    return new Promise((resolve, reject) => {
      var url = config.baseUrl + api.login
      let header = SignHeader(params)

      // 请求用户登录数据
      wx.request({
        url: url,
        data: params,
        method: 'POST',
        dataType: 'JSON',
        header: header,
        success: (res) => {
          console.log(res)
          if (res.statusCode != 200) {
            wx.$showToast(res.errMsg)
            return
          }
          var result = JSON.parse(res.data)
          if (result.code == 201) {
            resolve(result)
          } else {
            wx.$showToast(result.exception.message)
          }
        }, fail: (res) => {
          console.log(res)
          reject && reject(res)
        }
      })
    })
  },




}