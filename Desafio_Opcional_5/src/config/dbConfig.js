import mongoose from 'mongoose'
import envConfig from './envConfig.js';
import logger from '../utils/winston/winston.js';

const URI = envConfig.mongoUri

mongoose.connect(URI)
.then(() => {
    logger.debug("Conctado con exito a la base de datos");
})
.catch((error) => {
    logger.fatal(error)
})