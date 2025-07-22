import express from 'express'
import './loadEnv.js'
import { connectDB } from './db/connectDB.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import passport from 'passport'
import authRoutes from './routes/auth.js'
import './config/passport.js'
import grantRoutes from './routes/grants.js'


const app = express()

const PORT = process.env.PORT
app.use(cors({
    origin: process.env.CLIENT_URL_ONLINE,
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())
app.use(passport.initialize())

app.use("/api/auth", authRoutes)
app.use("/api/grants", grantRoutes)



app.listen(PORT, () => {
    connectDB()
    console.log(`server running on http://localhost:${PORT}`);
})