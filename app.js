//app.js



let DO = require("./do/index");
let Raven = require("./common/raven/raven.js")
let config = require("./config/config.js")

wx.$do = DO

App({
  onLaunch: function (options) {
    // 小程序自动更新
    wx.$do.updateManager.checkUpdate()

    // 异常监控 
    let ravenOptions = {
      release: config.version,
      environment: config.environment,
      allowDuplicates: true, // 允许相同错误重复上报
      sampleRate: 0.5 // 采样率
    }
    Raven.config(config.sentryUrl, ravenOptions).install()
  },
  onShow(){
    
  },


  globalData: {
    userInfo:''
  },

  onError(err){
   
  }
});
