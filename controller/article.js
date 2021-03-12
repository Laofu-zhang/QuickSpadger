/*
 * @Author: zhangyun
 * @Date: 2021-03-11 15:41:52
 * @LastEditors: zhangyun
 * @LastEditTime: 2021-03-12 09:18:50
 * @Desc:
 */
const mongoose = require('../db/connect.js')

const Article = mongoose.Schema({
  html: {
    type: 'string',
    required: true,
  },
  date: {
    type: 'date',
    required: true,
  },
  title: {
    type: 'string',
    required: true,
  },
  desc: {
    type: 'string',
    required: false,
  },
})

module.exports = mongoose.model('Article', Article)
