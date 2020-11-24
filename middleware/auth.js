const jwt = require('jsonwebtoken')
const { SECRET_KEY } = require('./../config')

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization
    const error = new Error();
    error.status = 404
    if (authHeader) {
        const token = authHeader.split('Bearer ')[1]
        if (token) {
            try {
                const user = jwt.verify(token, SECRET_KEY)
                req.user = user
                return next()
            } catch(e) {
                req.status(401).json({status:401, 'error':'Not Authorized'})
                error.message = 'Not Authorized'
                error.status = 401
                return next(error)
            }
        }
        error.message = 'Not Authorized'
        error.status = 401
        return next(error)
    }
    error.message = 'Not Authorized'
    error.status = 401
    return next(error)

}
