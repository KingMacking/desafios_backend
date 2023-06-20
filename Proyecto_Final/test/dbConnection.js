import mongoose from 'mongoose'
import logger from '../src/utils/winston/winston.js'
import envConfig from '../src/config/envConfig.js'

const URI = envConfig.mongoUri
mongoose.connect(URI)
.then(() => logger.debug('Connection to mongo database successfully'))
.catch(error => logger.error(error))