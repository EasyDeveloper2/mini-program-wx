// components/modal/index.js
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    show:{
      type:Boolean,
      value:true
    },
    src:{
      type:String,
      value:""
    },
    width:{
      type:null,
      value:500
    }
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
    onHide(){
      this.setData({
        show:false
      })
    }
  }
})
