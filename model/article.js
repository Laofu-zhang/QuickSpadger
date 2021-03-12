/*
 * @Author: zhangyun
 * @Date: 2021-03-11 15:44:53
 * @LastEditors: zhangyun
 * @LastEditTime: 2021-03-12 09:50:01
 * @Desc:
 */
const Article = require('../controller/article')
const CODES = require('../utils/statusCodes.js')

const createArticle = async (ctx) => {
  const { html, date, title, desc } = ctx.request.body
  console.log('======', ctx.request.body)
  if (!html || !title || !desc) {
    ctx.body = {
      code: CODES.error,
      message: '添加文章内容，标题或文章描述不能为空',
    }
    return
  }
  try {
    const newArticle = new Article({
      html: html,
      date: date,
      title: title,
      desc: desc,
    })
    await newArticle.save()
    ctx.body = {
      code: CODES.success,
      message: '创建成功',
    }
  } catch (e) {
    console.log('err:', e)
    ctx.body = {
      code: CODES.error,
      message: '创建失败',
    }
  }
}

const queryArticle = async (ctx) => {
  const { date } = ctx.request.query
  console.log('======article======', date)
  try {
    const FROM_DB_DATA = date ? await Article.find({ date: date }) : await Article.find({})
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
  createArticle,
  queryArticle,
}
