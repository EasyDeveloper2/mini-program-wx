
function DB() {
  this.setValue = function (key, value) {
    var dataType = typeof (value)
    console.log(dataType)
    if (dataType == "object") {
      value = JSON.stringify(value)
    }
    var data = {
      dataType,
      value: value
    }
    console.log(JSON.stringify(data))
    wx.setStorageSync(key, JSON.stringify(data))
  }
  this.setValue = function (key) {
    var dataString = wx.getStorageSync(key)
    if (dataString == null || dataString == '') {
      return null
    }
    var json = JSON.parse(dataString)
    var dataType = json["dataType"]
    var data = json["value"]
    console.log(dataType)
    switch (dataType) {
      case 'object':
        data = JSON.parse(data);
        break;
      case 'number':
        data = parseFloat(data);
        break;
      default:
        break;
    }
    return data
  }
}

let db = new DB()
module.exports = db