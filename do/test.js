/**
 * Created by xujie on 2018/2/16.
 */
module.exports = {
  // 是否是手机
  isPhone(value) {
    return /^1\d{10}$/.test(value)
  },
  // 是否是用户名
  isUsername(value) {
    return /^[a-zA-Z0-9_-]{4,16}$/.test(value)
  },
  // 密码格式验证
  isPassword(value) {
    return /([a-zA-Z0-9!@#$%^&*()_?<>{}]){6,15}/.test(value)
  },
  // 是否邮件
  isEmail(value) {
    return /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(value)
  },
  // 是否金钱格式
  isMoney(value){
    return /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test(value)
  },
  // 是否为空
  isEmpty(value) {
    if (value) {
      return true
    }
    return false
  },
  // 公司税号
  isTaxAvailable (num){
    return /^[A-Z0-9]{15}$|^[A-Z0-9]{17}$|^[A-Z0-9]{18}$|^[A-Z0-9]{20}$/.test(num)
  },
  // 运单号
  isExpress(num){
    return /^[0-9a-zA-Z]{5,30}$/.test(num)
  },
  // 身份证号
  isIDCard(num){
    return /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(num) || /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$/.test(num)
  },
  // 测试汉字真实姓名
  isRealName(name){
    return /^[\u4e00-\u9fa5+\·?\u4e00-\u9fa5+]{2,30}$/.test(name)
  }
}