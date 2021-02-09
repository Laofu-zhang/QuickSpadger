/*
 * @Author: zhangyun
 * @Date: 2021-02-05 07:51:48
 * @LastEditors: zhangyun
 * @LastEditTime: 2021-02-09 10:42:31
 * @Desc:
 */
const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!',
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json',
  }
})

module.exports = router
