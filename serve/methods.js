var Api = require("api")
const Post = require("request").post
const PostUsingAuthor = require("request").postUsingAuthor



/**
 * 微信授权登录
 * params {code:'微信授权code'}
 */
const login = (params = {}) => {
  return Post(Api.login, params)
}


/** 
 * 获取用户信息
 */
const getUserInfo = (params = {}) => {
  return Post(Api.getUserInfo, params)
}




module.exports = {
  login,
  getUserInfo,
}

