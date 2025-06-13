const express = require('express')
const bodyParser = require('body-parser')
const kafkaFactory = require('../../common/kafka');
const app = express()
app.use(bodyParser.json())

const kafkaProducer = kafkaFactory('lead-capture-producer').producer();

app.post('/lead', async (req, res)=>{
    try{
        // lead id is to deduplciation support
        //{"name":"Ravi","phone":"+919876543210","message":"I need bridal service","leadId":"123"}
        const lead = req.body;
        await kafkaProducer.connect();
        await kafkaProducer.send({
            topic: 'lead-capture',
            messages: [{value: JSON.stringify(lead)}]
        })
        res.status(200).send('lead captured successfully');
    }catch(e){
        console.log(e)
        res.status(500).send('failed to capture lead: ' + e.message);
    }
})
app.on('error', (error)=>{
    console.log(error)
})

app.listen(3001,()=>{
    console.log('producer server started on port 3001')
})