// components/backTop/index.js
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 页面置顶
    onScrollTop(e) {
      wx.pageScrollTo({
        scrollTop: 0,
      })
    },
  }
})
