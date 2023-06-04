import logger from "../utils/winston/winston.js"

class LoggerController {
    testAllLogs = (req,res) => {
        try {
            res.send('Logger test')
            logger.fatal('Fatal error log')
            logger.error('Error log')
            logger.warning('Warning log')
            logger.info('Info log')
            logger.http('Http log')
            logger.debug('Debug log')
        } catch (error) {
            next(error)
        }
    }
}

export default new LoggerController