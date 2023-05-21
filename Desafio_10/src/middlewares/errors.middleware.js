export const errorMiddleware = (error, req, res, next) => {
    console.log(error);
    res.send({
        status: error.name,
        cause: error.cause,
        message: error.message,
    })
}