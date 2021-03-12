/*
 * @Author: zhangyun
 * @Date: 2021-03-11 15:50:33
 * @LastEditors: zhangyun
 * @LastEditTime: 2021-03-11 16:04:02
 * @Desc:
 */
const router = require('koa-router')()
const { createArticle, queryArticle } = require('../model/article')

router.prefix('/article')

router.post('/', createArticle)
router.get('/', queryArticle)

module.exports = router
