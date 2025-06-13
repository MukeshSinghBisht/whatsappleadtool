const kafkaFactory = require('../../common/kafka');
const dlqProducer = kafkaFactory('dlq-producer').producer();

async function connect(){
    await dlqProducer.connect();
}

async function sendToDlq(payload, topic){
    try{
        await connect();
        payload = typeof payload === 'string' ? payload : JSON.stringify(payload);
        await dlqProducer.send({
            topic: topic,
            messages: [{value: payload}]
        })
    }catch(e){
        console.log(e)
        throw e;
    }
}

module.exports = {
    connect,
    sendToDlq
}