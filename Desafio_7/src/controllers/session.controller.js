const getCurrentSessionInfo = async (req,res) => {
    try {
        const currentSession = await req.session
        res.send(currentSession)
    } catch (error) {
        res.send(error)
    }
}

const getCurrenSessionUser = async (req,res) => {
    try {
        const currentUser = await req.session.user
        res.send(currentUser)
    } catch (error) {
        res.send(error)
    }
}

export default {
    getCurrentSessionInfo,
    getCurrenSessionUser,
}