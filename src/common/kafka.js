const { Kafka, logLevel }  = require('kafkajs');
const { customLogger } = require('./logger');

const kafka = new Kafka({
    clientId: 'lead-capture-app',
    brokers: ['localhost:9092'],
    logLevel: logLevel.INFO,
    logCreator:customLogger
})
const kafkaFactory = (clientId)=>{
    return new Kafka({
        clientId,
        brokers: ['localhost:9092'],
        logLevel: logLevel.INFO,
        logCreator:customLogger
    })
}
module.exports = (clientId)=>{
    return kafkaFactory(clientId)
}