/*
 * @Author: zhangyun
 * @Date: 2021-02-09 10:17:05
 * @LastEditors: zhangyun
 * @LastEditTime: 2021-02-09 10:38:48
 * @Desc:
 */
const router = require('koa-router')()
const { createWorks, queryWorks, deleteWorks } = require('../model/works')

router.prefix('/works')

router.get('/', queryWorks)
router.post('/', createWorks)
router.delete('/', deleteWorks)

module.exports = router
