const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const {Strategy, ExtractJwt} = require('passport-jwt')
const User = require('../models/user')

localOpts ={
    usernameField: 'email'
}

const localStrategy = new LocalStrategy(localOpts, async (email, password, done)=>{
        try {
            const user = await User.findOne({email: email})
            
            if(!user){
                return done(null, false)
            } else if(!user.comparePassword(password)){
                console.log(user.comparePassword(password))
                return done(null, false)
            }
            return done(null, user)
        } catch (error) {
            return done(null, error)
        }
})

jwtOpts ={
    secretOrKey: 'secret',
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt')
}
const jwtStrategy = new Strategy(jwtOpts, async (payload, done)=>{

    try {
        const user = await User.findOne({_id: payload})
        if(!user){
            return done(null, false)
        }
        return done(null, user)
    } catch (error) {
        return done(null, error)
    }
})
passport.use(localStrategy)
passport.use(jwtStrategy)
const localAuth = passport.authenticate('local', {session: false})
const jwtAuth = passport.authenticate('jwt', {session: false})
module.exports = {localAuth, jwtAuth}