import express from 'express'
import './loadEnv.js'
import { connectDB } from './db/connectDB.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import passport from 'passport'
import session from 'express-session'
import authRoutes from './routes/auth.js'
import './config/passport.js'
import grantRoutes from './routes/grants.js'


const app = express()

const PORT = process.env.PORT

app.use(express.json())
app.use(cookieParser())
app.use(session({
    secret: "clearfund_secret",
    resave: false,
    saveUninitialized: true
}))
app.use(cors({
    origin: "https://clearfund.netlify.app",
    credentials: true
}))



app.use(passport.initialize())
app.use(passport.session())


app.use("/api/auth", authRoutes)
app.use("/api/grants", grantRoutes)



app.listen(PORT, () => {
    connectDB()
    console.log(process.env.BACKEND_URL);
    console.log(`server running on http://localhost:${PORT}`);
})