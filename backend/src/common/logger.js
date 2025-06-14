const winston = require('winston');
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
    ]
})
const customLogger = () => {
    return ({ namespace, level, label, log }) => {
      const { message, ...extra } = log;
      console.log(`[${label}] [${level}] [${namespace}] ${message}`, extra);
    };
  };

module.exports = {
    logger,
    customLogger
}
