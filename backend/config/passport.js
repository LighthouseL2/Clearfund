
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/user.js";






passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `https://clearfund.onrender.com/api/auth/google/callback`,
}, async (accessToken, refreshToken, profile, done ) => {
    try {
        let user = await User.findOne({googleId: profile.id})
        if(!user) {
            user = await User.create({
                googleId: profile.id,
                email: profile.emails?.[0]?.value,
                accessToken,
                refreshToken,
                role: "user"
            })
            return done(null, user)
        }else {
            user.accessToken = accessToken
            if(refreshToken) user.refreshToken = refreshToken
            await user.save()
            return done(null, user)
        }


    } catch (error) {
        return done(error, false)
    }
}))