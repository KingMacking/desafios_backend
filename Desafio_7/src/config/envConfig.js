import dotenv from 'dotenv'

dotenv.config()

export default {
    port: process.env.PORT,
    mongoUri: process.env.MONGO_URI,
    githubClientId: process.env.GITHUB_CLIENT_ID,
    githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
}