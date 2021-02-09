/*
 * @Author: zhangyun
 * @Date: 2021-02-05 08:10:07
 * @LastEditors: zhangyun
 * @LastEditTime: 2021-02-09 10:23:52
 * @Desc:
 */
const User = require('../controller/user')
const _ = require('lodash')
const CODES = require('../utils/statusCodes.js')
// 获取用户
const getUser = async (ctx) => {
  const { username, currentPage = 1, pageSize = 10 } = ctx.request.query
  const startLine = (currentPage - 1) * pageSize

  try {
    console.log('===user===', startLine, pageSize)
    const USER_FROM_REQUEST = username
      ? await User.findOne({ username: username }).limit(Number(pageSize)).skip(startLine).exec()
      : await User.find({}).limit(Number(pageSize)).skip(startLine).exec()
    const USER_FROM_DB = await User.find({})
    ctx.body = {
      code: CODES.success,
      message: '获取用户成功',
      data: {
        currentPage: Number(currentPage),
        pageSize: Number(pageSize),
        total: USER_FROM_DB.length,
        data: USER_FROM_REQUEST,
      },
    }
  } catch (e) {
    ctx.body = {
      code: CODES.error,
      message: '获取用户失败',
    }
  }
}
// 添加用户
const saveUser = async (ctx) => {
  const QUEST_INFO = ctx.request.body
  if (!validatePostUser(ctx, ctx.request.body)) return
  const USER_FROM_REQUEST = {
    username: QUEST_INFO.username,
    password: QUEST_INFO.password,
  }
  const USER_FROM_DB = await User.findOne({ username: USER_FROM_REQUEST.username })
  if (!_.isEmpty(USER_FROM_DB)) {
    ctx.response.body = {
      code: CODES.error,
      message: '用户已存在',
    }
    return
  }
  const newUser = new User(USER_FROM_REQUEST)
  let code = 0
  let message = ''
  try {
    await newUser.save()
    code = CODES.success
    message = '添加成功'
  } catch (e) {
    code = CODES.error
    message = '添加失败'
  }
  ctx.response.body = {
    code,
    message,
  }
  return
}
// 删除用户
const removeUser = async (ctx) => {
  const id = ctx.request.query.id
  if (_.isEmpty(id)) {
    ctx.body = {
      code: CODES.error,
      message: '删除失败：id不能为空',
    }
    return
  }
  try {
    await User.findByIdAndRemove(id)
    ctx.body = {
      code: CODES.success,
      message: '删除成功',
    }
  } catch (e) {
    ctx.body = {
      code: CODES.error,
      message: '删除失败',
    }
  }
}
// 更新用户信息
const updateUser = async (ctx) => {
  if (!validatePostUser(ctx, ctx.request.body)) return
  const { id, password } = ctx.request.body
  try {
    const USER_FROM_DB = await User.findOne({ _id: id })
    if (!_.isEmpty(USER_FROM_DB)) {
      await User.findByIdAndUpdate(id, { password: password })
      ctx.body = {
        code: CODES.success,
        message: '更新成功',
      }
    }
  } catch (e) {
    ctx.body = {
      code: CODES.error,
      message: '更新失败',
    }
  }
}

// 验证用户输入是否正确
function validatePostUser(ctx, params) {
  if (_.isEmpty(params)) {
    ctx.body = {
      code: CODES.error,
      message: '请求参数不能为空',
    }
    return false
  }
  if (_.isEmpty(params.username) || _.isEmpty(params.password)) {
    ctx.body = {
      code: CODES.error,
      message: '用户名或密码不能为空',
    }
    return false
  }
  return true
}
module.exports = {
  getUser,
  saveUser,
  removeUser,
  updateUser,
}
