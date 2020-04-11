function toFixed(value){
   return parseFloat(value).toFixed(2)
}

/**
 * 格式化手机号码
 */ 
function toFormatPhone(value){
  var result = ""
  for(var i = 0;i<value.length;i++){
    console.log(i)
    result += value.charAt(i)
   if(i==3||i==7){
     result += " "
   }
  }
  return result
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 格式化日期
 * @params ...data 支持格式a.(2012-12-23) b.(new Date) c.(2012,12,23) 
 */
const formatDate = (...data) => {
  let year,month,day
  if(data.length==1){
    let dateData = data[0]
    if(typeof dateData==='string'){
      let date = new Date(dateData)
      year = date.getFullYear()
      month = date.getMonth() + 1
      day = date.getDate()
    }else if(typeof dateData==='object' && dateData instanceof Date){
      console.log(dateData)
      year = dateData.getFullYear()
      month = dateData.getMonth() + 1
      day = dateData.getDate()
    }else{
      throw new Error("入参格式不正确")
    }
  }else if (data.length==3){
    year = data[0]
    month = data[1]
    day = data[2]
  }else{
    throw new Error("入参格式不正确")
  }
  
  return [year, month, day].map(formatNumber).join("-")
}
/**
 * 格式化日期 
 */
const formatTime = date => {
  let year,month,day,hour,minute,second
  if(typeof date==='object' && date instanceof Date){
    year = date.getFullYear()
    month = date.getMonth() + 1
     day = date.getDate()
    hour = date.getHours()
     minute = date.getMinutes()
    second = date.getSeconds()
  }else if(typeof date ==='string'){
   let date0 = new Date(date)
   year = date0.getFullYear()
   month = date0.getMonth() + 1
   day = date0.getDate()
   hour = date0.getHours()
   minute = date0.getMinutes()
   second = date0.getSeconds()
  }else{
    throw new Error("数据格式错误")
  }
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

module.exports = {
  toFixed,
  toFormatPhone,
  formatDate,
  formatTime
}
