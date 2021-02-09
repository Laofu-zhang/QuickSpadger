/*
 * @Author: zhangyun
 * @Date: 2021-02-08 17:30:16
 * @LastEditors: zhangyun
 * @LastEditTime: 2021-02-09 11:38:06
 * @Desc:
 */
const Category = require('../controller/category')
const _ = require('lodash')
const CODES = require('../utils/statusCodes.js')

const createCategory = async (ctx) => {
  const { type, parentType, name } = ctx.request.body
  if (!type || !name) {
    ctx.body = {
      code: CODES.error,
      message: '分类名称或类型不能为空',
    }
    return
  }
  try {
    const newCategory = new Category({
      type: type,
      parentType: parentType,
      name: name,
    })
    await newCategory.save()
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
const queryCategory = async (ctx) => {
  const { id, type } = ctx.request.query
  console.log('======category======', id, type)
  try {
    const FROM_DB_DATA = id
      ? await Category.findById(id)
      : type
      ? await Category.find({ type: type })
      : await Category.find({})
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
const deleteCategory = async (ctx) => {
  const { id } = ctx.request.query
  if (!id) {
    ctx.body = {
      code: CODES.error,
      message: 'id不能为空',
    }
  }
  try {
    await Category.findOneAndRemove(id)
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
module.exports = {
  deleteCategory,
  queryCategory,
  createCategory,
}
