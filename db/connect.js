/*
 * @Author: zhangyun
 * @Date: 2021-02-05 07:58:04
 * @LastEditors: zhangyun
 * @LastEditTime: 2021-02-05 08:22:47
 * @Desc:
 */
const mongoose = require('mongoose')

const dbpath = 'mongodb://127.0.0.1:27017/zy_server'
mongoose.connect(dbpath)
mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

mongoose.connection.on('connected', function (e) {
  console.log('连接到mongodb成功')
})
mongoose.connection.on('error', function (e) {
  console.log('连接到mongodb失败: ', error)
})

module.exports = mongoose
