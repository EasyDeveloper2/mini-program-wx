/**
 * 生成随机数字
 * @parmas n 位数
 * @returns 
 */
const randomNum = (n) => {
  let str = "0123456789"
  let result = ''
  for (let i = 0; i < n; i++) {
    let s = parseInt(Math.random() * 100) / 10
    result += str.substr(s, 1)
  }
  return result
}

/**
 * 生成随机字符串
 * @parmas n 位数
 * @returns 
 */
const randomString= (n) => {
  let str = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvxwyz"
  let result = ''
  let length = str.length
  for (let i = 0; i < n; i++) {
    let s = parseInt(Math.random() * 100) % length
    result += str.substr(s, 1)
  }
  return result
}


module.exports = {
  randomNum,
  randomString
}