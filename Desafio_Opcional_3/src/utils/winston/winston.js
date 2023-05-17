import winston from 'winston'
import config from '../../config/envConfig.js'

const myCustomLevels = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5,
    },
    colors: {
        fatal: 'magenta',
        error: 'red',
        warning: 'yellow',
        info: 'green',
        http: 'blue',
        debug: 'cyan'
    }
}

let logger = winston.createLogger({
    levels: myCustomLevels.levels,
})

if(config.node_env === 'development'){
    logger.add(new winston.transports.Console({
        level: 'debug',
        format: winston.format.combine(
            winston.format.colorize({colors: myCustomLevels.colors}),
            winston.format.simple(),
        ),
    }))
} else {
    logger.add(new winston.transports.File({
        filename: './errors.log',
        level: 'error',
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.prettyPrint()
        )
    }))
}

export default logger

