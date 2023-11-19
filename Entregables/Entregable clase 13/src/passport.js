import passport from "passport"
import { UsersManager } from "./dao/manager/users.manager.js"
import { Strategy as LocalStrategy } from "passport-local"
import { Strategy as GitHubStrategy } from "passport-github2"
import {hashData, compareHashedData} from "./utils.js"
import { usersModel } from "./dao/db/models/users.model.js"

// LOCAL
passport.use(
    "signup",
    new LocalStrategy(
        {usernameField:"email", passReqToCallback:true},
        async (req, email, password, done) => {
            try {
                const user = await UsersManager.getUserByEmail(email)
                if (user){
                    done(null, false)           
                }
                const newUser = {
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    age: req.body.age,
                    password: await hashData(password)
                }
                const createdUser = await UsersManager.createUser(newUser)
                done(null, createdUser)
            } catch (error) {
                done(error)
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
                const user = await UsersManager.getUserByEmail(email)
                if (!user) {
                    done(null, false)           
                }
                if (! await compareHashedData(password, user.password)){
                    done(null, false)
                }
                done(null, user)
            } catch (error) {
                done(error)
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
    const user = await UsersManager.getUserByEmail(profile.email)
    // LOGIN
    if(user){
        if(user.from_github){
            done(null, user)
        }
        else{
            done(null, false)
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
        const createdUser = await UsersManager.createUser(newUser)
        done(null, createdUser)
    }
  }
))

passport.serializeUser(function(user, done) {
    done(null, user._id)
})

passport.deserializeUser(async function(id, done) {
    try {
        const user = await UsersManager.getUserById(id)
        done(null, user)
    } catch (error) {
        done(error)
    }
})