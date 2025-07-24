import express from 'express'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import {
        authMiddleware,
        checkRoles,
        getUsers,
        loginUser,
        logoutUser,
        registerUser
    } from '../controllers/auth-controllers.js'


const router = express.Router()

router.get("/google", passport.authenticate("google", {
    scope: ["profile", "email"],
    accessType: "offline",
    prompt: "consent",
}))

router.get("/google/callback", passport.authenticate("google", {
    // session: false,
    failureRedirect: `${process.env.CLIENT_URL_ONLINE}/?route=login`
}), (req, res) => {
    // const { accessToken, refreshToken } = req.user

    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    })

    res.cookie('access_token', token, {
        httpOnly: true,
        sameSite: 'None',
        secure: true,
    })

    // res.cookie('accessToken', accessToken, {
    //     httpOnly: true,
    //     sameSite: 'lax',
    //     secure: true,
    //     maxAge: 60 * 60 * 1000
    // })

    // res.cookie('refreshToken', refreshToken, {
    //     httpOnly: true,
    //     sameSite: 'lax',
    //     secure: true,
    //     maxAge: 7 * 24 * 60 * 1000
    // })

    // res.status(200).json({
    //     token: token
    // })

    res.redirect(`${process.env.CLIENT_URL_ONLINE}/dashboard`)
})




router.post("/refresh-token", (req, res) => {
    const refreshToken = req.cookies.refreshToken

    if(!refreshToken) return res.status(401).json({message: "No refresh token" })

    const newAccessToken  = jwt.sign({ id: req.user }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    })

    res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 1000
    })

    res.json({ success: true })
})

router.get("/", authMiddleware, checkRoles("admin"), getUsers)

router.post("/register", registerUser)

router.post("/login", loginUser)

router.post("/logout", logoutUser)


router.get("/check-auth", authMiddleware, (req, res) => {
    res.status(200).json({
        message: "You are authenticated ",
        user: req.user,
        success: true
    })
})



export default router