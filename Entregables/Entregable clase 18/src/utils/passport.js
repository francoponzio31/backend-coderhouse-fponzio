import passport from "passport"
import usersService from "../services/users.service.js"
import { Strategy as LocalStrategy } from "passport-local"
import { Strategy as GitHubStrategy } from "passport-github2"
import { hashData, compareHashedData } from "./utils.js"


// LOCAL
passport.use(
    "signup",
    new LocalStrategy(
        {usernameField:"email", passReqToCallback:true},
        async (req, email, password, done) => {
            try {
                const user = await usersService.getUserByEmail(email)
                if (user){
                    return done(null, false)           
                }
                const newUser = {
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    age: req.body.age,
                    password: await hashData(password)
                }
                const createdUser = await usersService.createUser(newUser)
                return done(null, createdUser)
            } catch (error) {
                return done(error)
            }
        }
    )
)

passport.use(
    "login",
    new LocalStrategy(
        {usernameField:"email"},
        async (email, password, done) => {
            try {
                const user = await usersService.getUserByEmail(email)
                if (!user) {
                    return done(null, false)           
                }
                if (! await compareHashedData(password, user.password)){
                    return done(null, false)
                }
                return done(null, user)
            } catch (error) {
                return done(error)
            }
        }
    )
)

// GITHUB
passport.use(
    "github",
    new GitHubStrategy({
    clientID: "Iv1.cc177741f48b0c01",
    clientSecret: "eef0586907833f2ee1b3226af5148bd1b3ca8d45",
    scope: ["user:email"],
    callbackURL: "http://localhost:8080/api/sessions/github/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    const email = profile.emails[0].value
    const user = await usersService.getUserByEmail(email)

    // LOGIN
    if(user){
        if(user.from_github){
            return done(null, user)
        }
        else{
            return done(null, false)
        }
    }

    // SIGNUP
    else{
        const newUser = {
            first_name: profile.username,
            last_name: "-",
            email: profile.emails[0].value,
            age: 0,
            password: "-",
            from_github: true
        }
        const createdUser = await usersService.createUser(newUser)
        return done(null, createdUser)
    }
  }
))

passport.serializeUser(function(user, done) {
    return done(null, user._id)
})

passport.deserializeUser(async function(id, done) {
    try {
        const user = await usersService.getUserById(id)
        return done(null, user)
    } catch (error) {
        return done(error)
    }
})