export const errorMiddleware = (error, req, res, next) => {
    res.send({
        status: error.name,
        cause: error.cause,
        message: error.message,
    })
}