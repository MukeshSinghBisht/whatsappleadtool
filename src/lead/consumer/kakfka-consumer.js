// const { Kafka, logLevel }  = require('kafkajs');
const { addToDlq, consumers } = require('../../dlq/service/dlq.service');
const { leadsDlQueued } = require('../../common/metric');
const { processLead } = require('../service/lead.service');
const kafkaFactory = require('../../common/kafka');
const { logger } = require('../../common/logger');
const kafka = kafkaFactory('lead-consumer');

const consumer = kafka.consumer({groupId: 'lead-consumer-group'});
// const processLead1 = async (lead)=>{
//     logger.info('new lead message received', lead)
//     try {
//         if(lead.leadId){
//             // check in db if leadid exist , if no then save it and process, and if alrady esxit then return
//             const leadexist = await leadExists(lead.leadId)
//             if(leadexist){
//                 console.log(`Lead ${lead.leadId} already processed`);
//                 return;
//             }
//         }
//         if(!lead.phone.startsWith('+91')){
//             throw new Error('Invalid phone number');
//         }
//         logger.info(`📤 Sending email to ${lead.phone}...`);
//         logger.info(`📩 Message: Thank you ${lead.name}, we got your request: "${lead.message}"`);  
//         await saveLead(lead, leadsProcessed);
//         success = true;
//     } catch (error) {
//         logger.info(`🚫 Lead ${lead.leadId} is not valid`);
//         logger.info(`lead moved to dlq`);
//         await addToDlq(lead, leadsDlQueued, consumers.leaddlq);
//     }
// }
const startProcessing = async (lead)=>{
    logger.info('new lead message received', lead)
    try {
        await processLead(lead)
    } catch (error) {
        logger.info(`🚫 Lead ${lead.leadId} is not valid`);
        logger.info(`lead moved to dlq`);
        await addToDlq(lead, leadsDlQueued, consumers.leaddlq);
    }
}
const startConsumer = async () => {
    await consumer.connect();
    await consumer.subscribe({
        topic: 'lead-capture',
        fromBeginning: true
    })
    await consumer.run({
        eachMessage: async ({topic, partition, message})=>{
            await startProcessing(JSON.parse(message.value.toString()));
        }
    })
}
module.exports = {
    startConsumer
}