/**
 * 路径解析参数工具类 
 */
const validPath=(path)=>{
  if(typeof(path)==='string'){
     return true
  }else{
    throw new Error('path must string')
  }
}

  /**
   * 解析数据
   * @params name=xj&age=12 解析为{name:x,age:12}
   * @returns   
   */
 const querys = (path)=>{
    if(validPath(path)){
      let components = path.split("?")
      let queryString = ''
      if (components.length == 2) {
        queryString = components[1]
      }
      let list = queryString.split("&")
      let querys = {}
      for (let i in list) {
        let result = list[i].split("=")
        if (result.length == 2) {
          let key = result[0]
          let value = result[1]
          querys[key] = value
        }
      }
      return querys
    }
   }
     /**
     * 获取参数的数量 
     * @returns
     */
    const numberOfKeys = ()=>{
      if(validPath(path)){
      let components = path.split("?")
      let queryString = ''
      if (components.length == 2) {
        queryString = components[1]
      }
      let list = queryString.split("&")
      return list.length
     }
    
}

module.exports = {
  querys,
  numberOfKeys
}