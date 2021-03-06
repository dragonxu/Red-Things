const { User } = require('../models')
const { decodeToken } = require('../api/jwt')

module.exports = async function (req, res, next) {
let token= req.cookies.token
  if (token) {
    let id = decodeToken(token).id
    let user = await User.findOne({
      _id: id
    }).populate('group')
    if (user) {
      req.app.username = user.username
      req.app.userType = user.super
      req.app.userPermission = user.group
      return next()
    } else {
      return res.redirect('/login')
    }
  }

  if (req.url == '/login') {
    return next()
  } else {
    return res.redirect('/login')
  }
}