const User = require('../../models/user')
const httpStatus = require('http-status')

exports.signup = async (req, res, next)=>{
try {
    const {firstName, lastName, email, password} = req.body
    const user = new User({firstName, lastName, email, password})
      await  user.save()
      return await res.status(httpStatus.CREATED).json(user.toJSON())
} catch (error) {
    return res.status(httpStatus.BAD_REQUEST)
} 
}

exports.login =  (req, res, next)=>{
    res.status(httpStatus.OK).json(req.user.toJSON())
  next()
}