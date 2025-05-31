import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import GitHubStrategy from "passport-github2";
import User from "../../models/User.mjs"
import dotenv from "dotenv"
dotenv.config()

passport.serializeUser((user, done) => {
    done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id)
    done(null, user)
})

//Estratégia do google
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID_GOOGLE,
    clientSecret: process.env.CLIENT_SECRET_GOOGLE,
    callbackURL: "http://localhost:8080/api/users/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ googleId: profile.id })
        if (!user) {
            user = await User.create({
                nome: profile.displayName,
                googleId: profile.id,
                email: profile.emails[0].value
            })
        }
        return done(null, user)
    }
    catch (error) {
        return done(error, null)
    }
}))

//Estratégia do github
passport.use(new GitHubStrategy({
    clientID: process.env.CLIENT_ID_GITHUB,
    clientSecret: process.env.CLIENT_SECRET_GITHUB,
    callbackURL: "http://localhost:8080/api/users/github/callback",
    scope: ["user:email"]
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const email = profile.emails?.[0]?.value

        if (!email) {
            return done(new Error("O GitHub não retornou um e-mail. Vá nas configurações da sua conta GitHub e torne o e-mail visível ou público."), null);
        }
        
        let user = await User.findOne({ githubId: profile.id })
        if (!user) {
            user = await User.create({
                nome: profile.displayName || profile.username,
                githubId: profile.id,
                email: profile.emails?.[0].value || ''
            })
        }
        return done(null, user)
    }
    catch (err) {
        return done(err, null)
    }
}))