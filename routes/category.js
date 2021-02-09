/*
 * @Author: zhangyun
 * @Date: 2021-02-09 11:19:53
 * @LastEditors: zhangyun
 * @LastEditTime: 2021-02-09 11:22:34
 * @Desc:
 */
const router = require('koa-router')()
const { createCategory, queryCategory, deleteCategory } = require('../model/category')

router.prefix('/category')

router.get('/', queryCategory)
router.post('/', createCategory)
router.delete('/', deleteCategory)

module.exports = router
