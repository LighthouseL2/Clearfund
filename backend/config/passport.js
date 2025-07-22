
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/user.js";



passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `https://clearfund.onrender.com/api/auth/google/callback`,
}, async (_, __, profile, done ) => {
    try {
        let user = await User.findOne({googleId: profile.id})
        if(!user) {
            user = await User.create({
                googleId: profile.id,
                email: profile.emails?.[0]?.value,
                role: "user"
            })
        }
        return done(null, user)
    } catch (error) {
        return done(error, false)
    }
}))