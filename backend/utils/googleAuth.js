import { google } from 'googleapis'
import User from '../models/user.js'



const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.CALL_BACK_URL
)


export async function refreshAccessToken(userId) {
    const user = await User.findById(userId)

    if(!user || !user.refreshToken) {
        throw new Error("User not found or missing refresh token")
    }

    oauth2Client.setCredentials({ refreshToken: user.refreshToken})

    try {
        const { credentials } = await oauth2Client.refreshAccessToken()

        user.accessToken = credentials.access_token
        await user.save()

        return credentials.access_token

    } catch (err) {
        console.error("Failed to refresh access Token", err.message);
        throw err
    }
}