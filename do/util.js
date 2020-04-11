
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}


const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


const formatDate = (year, month, day) => {
  return [year, month, day].map(formatNumber).join("-")
}





const shake= (func) =>{
  if(wx.shakeTime){
    clearTimeout(wx.shakeTime)
  }
  wx.shakeTime = setTimeout(func,200)
}


//倒计时；
const countdownTime1 = function (timeStamp, that) {
  let interval = null, totalSecond = timeStamp - Date.parse(new Date()) / 1000;
  interval = setInterval(function () {
    // 秒数  
    let second = totalSecond;

    // 小时位  
    let hr = Math.floor(second / 3600);
    let hrStr = hr.toString();
    if (hrStr.length == 1) hrStr = '0' + hrStr;

    // 分钟位  
    let min = Math.floor((second - hr * 3600) / 60);
    let minStr = min.toString();
    if (minStr.length == 1) minStr = '0' + minStr;

    // 秒位  
    let sec = second - hr * 3600 - min * 60;
    let secStr = sec.toString();
    if (secStr.length == 1) secStr = '0' + secStr;
    that.setData({
      countDownHour: hrStr,
      countDownMinute: minStr,
      countDownSecond: secStr,
    });
    totalSecond--;
    if (totalSecond <= 0) {
      clearInterval(interval);
      wx.showToast({
        title: '活动已结束',
        icon: 'none',
        duration: 1000,
        mask: true,
      })
      that.setData({
        countDownHour: '00',
        countDownMinute: '00',
        countDownSecond: '00',
      });
    }
  }.bind(that), 1000);
  that.setData({ interval: interval });
}

//倒计时2；
const countdownTime2 = function (timeStamp, that) {
  let totalSecond = (timeStamp - Date.parse(new Date())) / 1000;
  let interval = setInterval(function () {
    // 秒数  
    let second = totalSecond;
    // // 天数位  
    let day = Math.floor(second / 3600 / 24);
    let dayStr = day.toString();
    if (dayStr.length == 1) dayStr = '0' + dayStr;
    // 小时位  
    let hr = Math.floor((second - day * 3600 * 24) / (60 * 60));
    let hrStr = hr.toString();
    if (hrStr.length == 1) hrStr = '0' + hrStr;

    // 分钟位  
    // let min = Math.floor((second - hr * 3600) / 60);
    let min = Math.floor((second - day * 3600 * 24 - hr * 3600) / 60);
    let minStr = min.toString();
    if (minStr.length == 1) minStr = '0' + minStr;

    // 秒位  
    // let sec = second - hrNew * 3600 - min * 60;
    let sec = Math.floor(second - day * 3600 * 24 - hr * 3600 - min * 60);
    let secStr = sec.toString();
    if (secStr.length == 1) secStr = '0' + secStr;

    that.setData({
      countDownDay: dayStr,
      countDownHour: hrStr,
      countDownMinute: minStr,
      countDownSecond: secStr,
    });
    totalSecond--;
    if (totalSecond <= 0) {
      clearInterval(interval);
      that.setData({
        countDownDay: '00',
        countDownHour: '00',
        countDownMinute: '00',
        countDownSecond: '00',
      });
    }
  }.bind(that), 1000);
  that.setData({ interval: interval });
}




export {
  formatTime,
  formatDate,
  shake
}
