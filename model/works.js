/*
 * @Author: zhangyun
 * @Date: 2021-02-08 17:30:02
 * @LastEditors: zhangyun
 * @LastEditTime: 2021-02-09 11:14:48
 * @Desc:
 */
const Works = require('../controller/works')
const _ = require('lodash')
const CODES = require('../utils/statusCodes.js')
const createWorks = async (ctx) => {
  const { title, category, details } = ctx.request.body
  console.log('=====works=====', ctx.request.body)
  try {
    const newWorks = new Works({
      title: title,
      category: category,
      details: details,
    })
    await newWorks.save()
    ctx.body = {
      code: CODES.success,
      message: '创建成功',
    }
  } catch (e) {
    ctx.body = {
      code: CODES.error,
      message: '创建失败',
    }
  }
}
const deleteWorks = async (ctx) => {
  const { id } = ctx.request.query
  if (!id) {
    ctx.body = {
      code: CODES.error,
      message: 'id不能为空',
    }
  }
  try {
    await Works.findByIdAndRemove(id)
    ctx.body = {
      code: CODES.error,
      message: '删除成功',
    }
  } catch (e) {
    ctx.body = {
      code: CODES.error,
      message: '删除失败',
    }
  }
}
const queryWorks = async (ctx) => {
  const { id, title, category } = ctx.request.query
  try {
    const FROM_DB_DATA = id
      ? await Works.findById(id)
      : title || category
      ? await Works.find({
          $or: [{ title: title }, { category: category }],
        })
      : await Works.find({})
    ctx.body = {
      code: CODES.success,
      message: '查询成功',
      data: FROM_DB_DATA,
    }
  } catch (e) {
    ctx.body = {
      code: CODES.error,
      message: '查询失败',
    }
  }
}

module.exports = {
  createWorks,
  deleteWorks,
  queryWorks,
}
