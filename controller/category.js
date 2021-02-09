/*
 * @Author: zhangyun
 * @Date: 2021-02-08 17:24:18
 * @LastEditors: zhangyun
 * @LastEditTime: 2021-02-09 11:26:34
 * @Desc:
 */
const mongoose = require('../db/connect.js')

const CategorySchema = mongoose.Schema({
  type: {
    type: 'string',
    required: true,
  },
  parentType: {
    type: 'string',
  },
  name: {
    type: 'string',
    required: true,
  },
})

module.exports = mongoose.model('Category', CategorySchema)
