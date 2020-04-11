module.exports = {
  onTapImage(e){
    wx.showToast({
      title: "点击了banner"+e.currentTarget.dataset.index,
      icon:'none'
    })
  }
}