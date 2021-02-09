/*
 * @Author: zhangyun
 * @Date: 2021-02-05 07:51:48
 * @LastEditors: zhangyun
 * @LastEditTime: 2021-02-08 16:04:01
 * @Desc:
 */
const router = require('koa-router')()
const { saveUser, getUser, removeUser, updateUser } = require('../model/user')

router.prefix('/users')

router.get('/', getUser)
router.post('/', saveUser)
router.delete('/', removeUser)
router.put('/', updateUser)

module.exports = router
