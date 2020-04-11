
Component({
  options: {
    addGlobalClass: true
  },
  properties: {
    msgList: {
      type: Array,
      value: true
    }
  },
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTapBannerList(e) {
      console.log("eee",e)
      let item = e.currentTarget.dataset.item
      let linkType = item.linkType
      switch (parseInt(linkType)) {
        case 0: this.onSwitchToPage(item); break;
        case 1: this.onPushToPage(item); break;
        case 2: this.onPushToWebview(item); break;
        case 3: this.onSwitchToInPage(item); break;
        case 4: this.onLaunchMiniProgram(item); break;
      }
    },
    onSwiperChange(e) {
      this.setData({
        bannerIndex: e.detail.current
      })
    },

    // 0 跳转到tab页面
    onSwitchToPage(item) {
      // let parseQuerys = wx.$util.parseQuerys(item.link)
      // for (let key in parseQuerys) {
      //   wx.setStorageSync(key, parseQuerys[key])
      // }
      // wx.switchTab({
      //   url: item.link,
      // })
    },

    // 1跳转到页面
    onPushToPage(item) {
      wx.navigateTo({
        url: item.link,
      })
    },

    // 2打开网页
    onPushToWebview(item) {
      let link = encodeURI(item.link)
      wx.$router.push("/pages/webview/webview", { href: link })
    },

    // 3打来小程序内页
    onSwitchToInPage(item) {
      // let parseQuerys = wx.$util.parseQuerys(item.link)
      // for (let key in parseQuerys) {
      //   wx.setStorageSync(key, parseQuerys[key])
      // }
      // let page = getCurrentPages()[getCurrentPages().length - 1]
      // let route = page.route
      // if (item.link.indexOf(route) == -1) {
      //   wx.switchTab({
      //     url: item.link,
      //   })
      // } else {
      //   page.onShow()
      // }

    },

    // 4.打开其它小程序
    onLaunchMiniProgram(item) {
      wx.navigateToMiniProgram({
        appId: item.appId,
        path: item.link,
        envVersion: config.envVersion
      })
    }
  }
})
