import User from "../models/user.js"
import jwt from 'jsonwebtoken'
import bcrypt from "bcryptjs"
import { refreshAccessToken } from "../utils/googleAuth.js"



export const getUsers = async (req, res) => {

    try {
        const allUsers = await User.find()

        return res.json({
            success: true,
            data: allUsers
        })

    } catch (error) {
        res.json({
            success: false,
            message: `Failed to fetch all users ${error.message}`
        })
    }
}

export const checkRoles = role => (req, res, next) => {
    console.log(req.user.role);

    if(req.user?.role !== "admin") {
        return res.status(403).json({
            success: false,
            message: `Access denied. Requires ${role} role.`
        })
    }
    next()
}


export const authMiddleware = async (req, res, next) => {

    try {

        // const token = req.cookies?.access_token
        // const accessToken = req.cookies.accessToken
        const authHeader = req.headers.authorization

        if(!authHeader?.startsWith("Bearer ")) return res.status(401).json({
            success: false,
            message: "Unauthorized User Token not found"
        })

        const token = authHeader.split(" ")[1]

        // if(!token) return res.status(401).json({
        //     success: false,
        //     message: "Unauthorized User Token not found"
        // })


        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded

        next()
    } catch (error) {
        res.status(401).json({
            success: false,
            message: `Unauthorized user! ${error.message}`
        })
    }
}


export const logoutUser = async (req, res) =>{
    res.clearCookie("token").json({
        message: "Logged out successfully",
        success: true
    })
}


export const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body

        const checkUser = await User.findOne({ email })
        if(!checkUser) return res.status(404).json({
            success: false,
            message: "User doesn't exist Please register first"
        })

        const checkPasswordMatch = bcrypt.compare(password, checkUser.password)
        if(!checkPasswordMatch) return res.status(400).json({
            success: false,
            message: "Invalid Password, Please try again"
        })

        const token = jwt.sign({
            id: checkUser._id,
            email: checkUser.email,
            role: checkUser.role,
        }, process.env.JWT_SECRET, {expiresIn: "60m"})

        // res.cookie("access_token", token, {
        //     httpOnly: true,
        //     secure: true,
        //     sameSite: "None",

        // })
        res.json({
            success: true,
            message: "Logged in successfully",
            data: {
                id: checkUser._id,
                email: checkUser.email,
                role: checkUser.role
            },
            token: token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "SignUp failed, some error occured"
        })
    }
}


export const registerUser = async (req, res) => {

    try {

        const { email, password } = req.body


        const userExists = await User.findOne({email})
        if(userExists) return res.status(404).json({
            success: false,
            message: "User already exists"
        })

        // hash the password
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({
            email,
            role: "user",
            password: hashedPassword
        })
        newUser.save()

        return res.status(201).json({
            success: true,
            message: "User Registered successfully",
            data: {
                id: newUser._id,
                email: newUser.email,
            }
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "SignUp failed, some error occured"
        })
    }
}


export const getUserById = async (req, res) => {

    const userId = req.params.userId

    try {
        const user = await User.findById(userId)
        if(!user) return res.status(404).json({
            success: false,
            message: "User not found"
        })

        let accessToken = user.accessToken

        accessToken = await refreshAccessToken(userId)

        return res.json({
            success: true,
            data: user
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "some error occured"
        })
    }
}

export const deleteAccount = async (req, res) => {
    try {

        await User.findByIdAndDelete(req.user.id)
        return res.status(200).json({
            success: true,
            message: "Account Deleted successfully"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Error deleting account ${error.message}`
        })
    }
}