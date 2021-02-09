/*
 * @Author: zhangyun
 * @Date: 2021-02-05 08:06:01
 * @LastEditors: zhangyun
 * @LastEditTime: 2021-02-05 08:52:32
 * @Desc:
 */
const mongoose = require('../db/connect.js')

const UserSchema = mongoose.Schema({
  username: {
    type: 'string',
    required: true,
  },
  password: {
    type: 'string',
    required: true,
  },
})

module.exports = mongoose.model('User', UserSchema)
