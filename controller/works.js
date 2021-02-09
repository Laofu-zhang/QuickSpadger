/*
 * @Author: zhangyun
 * @Date: 2021-02-08 17:21:50
 * @LastEditors: zhangyun
 * @LastEditTime: 2021-02-08 17:28:12
 * @Desc:
 */
const mongoose = require('../db/connect.js')

const WorksSchema = mongoose.Schema({
  title: {
    type: 'string',
    required: true,
  },
  category: {
    type: 'string',
    required: true,
  },
  details: {
    type: 'object',
  },
})

module.exports = mongoose.model('Works', WorksSchema)
