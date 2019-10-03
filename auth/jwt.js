const jwt = require('jsonwebtoken')
const secret_key = process.env.SECRET_KEY || 'caminantepassword2019'

module.exports = {
  sign: (id, cb) => {
    jwt.sign({ sub: id }, secret_key, { expiresIn: '1d'}, (err, token) => {
      if (err) {
        return cb(err, null)
      }
      return cb(null, token)
    })
  },
  verify: (token, cb) => {
    jwt.verify(token, secret_key, (err, decoded) => {
      if (err) {
        return cb(err, null)
      }
      return cb(null, decoded.sub)
    })
  }
}