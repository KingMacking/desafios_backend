import dotenv from 'dotenv'

dotenv.config()

export default {
    node_env: process.env.NODE_ENV,
    port: process.env.PORT,
    mongoUri: process.env.MONGO_URI,
    githubClientId: process.env.GITHUB_CLIENT_ID,
    githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
    adminEmail: process.env.ADMIN_EMAIL,
    adminPassword: process.env.ADMIN_PASSWORD,
    gmailPassword: process.env.GMAIL_PASSWORD,
    gmailUser: process.env.GMAIL_USER,
}