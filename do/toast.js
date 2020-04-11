/**
 * 显示消息 
 * @param msg 
 */

const message = (msg)=>{
  wx.showToast({
    title: msg,
    icon: "none"
  })
}
/**
 * 显示成功消息
 * @param msg 
 */
const success = (msg)=>{
  wx.showToast({
    title: msg,
  })
}

module.exports = {
  message,
  success
}