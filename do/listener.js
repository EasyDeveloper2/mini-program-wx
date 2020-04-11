let objects = {}
module.exports = {
  on(eventName,event){
    if(eventName && typeof eventName==='string'){
      if(!objects[eventName]){
         objects[eventName] = []
      }
      if(event && typeof event === 'function'){
         objects[eventName].push(event)
      }
    }else{
      throw new Error("eventName must be string")
    }
  },
  commit(eventName,data){
    if(typeof eventName==='string'){
      if(objects[eventName] &&objects[eventName].length){
        for(let f of objects[eventName]){
          if(typeof f === 'function'){
            f(data)
          }
        }
     }
    }else{
      throw new Error("eventName must be string")
    }
  }
}