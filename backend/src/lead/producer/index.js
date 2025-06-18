const express = require('express')
const bodyParser = require('body-parser')
const kafkaFactory = require('../../common/kafka');
const app = express()
app.use(bodyParser.json())

const kafkaProducer = kafkaFactory('lead-capture-producer').producer();
produceLeadEvent = async (lead) => {
    try{
        await kafkaProducer.connect();
        await kafkaProducer.send({
            topic: 'lead-capture',
            messages: [{value: JSON.stringify(lead)}]
        })
    }catch(e){
        console.log(e)
        throw e;
    }
}
module.exports = {
    produceLeadEvent
}
