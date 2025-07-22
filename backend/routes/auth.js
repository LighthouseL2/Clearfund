import express from 'express'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import { authMiddleware, checkRoles, getUsers, loginUser, logoutUser, registerUser } from '../controllers/auth-controllers.js'


const router = express.Router()

router.get("/google", passport.authenticate("google", {
    scope: ["profile", "email"],
    accessType: "offline",
    prompt: "consent",
}))

router.get("/google/callback", passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.CLIENT_URL_ONLINE}/?route=login`
}), async (req, res) => {
    const { accessToken, refreshToken } = req.user

    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    })

    res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'lax'
    })

    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        sameSite: 'lax',
        secure: true,
        maxAge: 60 * 60 * 1000
    })

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        sameSite: 'lax',
        secure: true,
        maxAge: 7 * 24 * 60 * 1000
    })

    res.redirect(`${process.env.CLIENT_URL_ONLINE}/dashboard`)
})

router.get("/", authMiddleware, checkRoles("admin"), getUsers)

router.post("/register", registerUser)

router.post("/login", loginUser)

router.post("/logout", logoutUser)




export default router